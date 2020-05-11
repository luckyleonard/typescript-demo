import cheerio from 'cheerio';
import fs from 'fs';
import { Analyzer } from './crowller';

interface News {
  title: string;
  website: string;
}

interface NewsData {
  time: number;
  data: News[];
}

interface FileContent {
  [propName: number]: News[];
}

export default class NewsAnalyzer implements Analyzer {
  private static instance: NewsAnalyzer;

  static getInstance() {
    if (!NewsAnalyzer.instance) {
      NewsAnalyzer.instance = new NewsAnalyzer();
    }
    return NewsAnalyzer.instance;
  }

  private constructor() {}

  private getJsonInfo(html: string) {
    const $ = cheerio.load(html);

    const newsItems = $('.athing');
    const newsInfos: News[] = []; //存储爬取出的News列表

    newsItems.each((index, newsItem) => {
      //cheerio的自带方法，格式必须按照规定写
      const title = $(newsItem).find('.storylink').text();
      const website = $(newsItem).find('.sitestr').text();
      newsInfos.push({ title, website });
    });

    return {
      time: new Date().getTime(),
      data: newsInfos,
    };
  }

  private generateJsonContent(newsInfo: NewsData, filePath: string) {
    let fileContent: FileContent = {}; //暂存Json格式的文件内容
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[newsInfo.time] = newsInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const newsInfo = this.getJsonInfo(html);
    const fileContent = this.generateJsonContent(newsInfo, filePath);
    return JSON.stringify(fileContent);
  }
}
