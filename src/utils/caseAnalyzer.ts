import cheerio from 'cheerio';
import fs from 'fs';
import { Analyzer } from './crowller';

interface Case {
  title: string;
  count: number;
}

interface CaseData {
  time: number;
  data: Case[];
}

interface FileContent {
  [propName: number]: Case[];
}

export default class CaseAnalyzer implements Analyzer {
  private static instance: CaseAnalyzer;

  static getInstance() {
    if (!CaseAnalyzer.instance) {
      CaseAnalyzer.instance = new CaseAnalyzer();
    }
    return CaseAnalyzer.instance;
  }

  private constructor() {}

  private getJsonInfo(html: string) {
    const $ = cheerio.load(html);

    const caseItems = $('#maincounter-wrap');
    const caseInfos: Case[] = []; //存储爬取出的Case列表
    const regex = /,/gi;

    caseItems.each((index, caseItem) => {
      //cheerio的自带方法，格式必须按照规定写
      const title = $(caseItem).find('h1').text();
      const count = parseInt(
        $(caseItem).find('.maincounter-number span').text().replace(regex, ''),
        10
      );
      caseInfos.push({ title, count });
    });

    return {
      time: new Date().getTime(),
      data: caseInfos,
    };
  }

  private generateJsonContent(caseInfo: CaseData, filePath: string) {
    let fileContent: FileContent = {}; //暂存Json格式的文件内容
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[caseInfo.time] = caseInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const caseInfo = this.getJsonInfo(html);
    const fileContent = this.generateJsonContent(caseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}
