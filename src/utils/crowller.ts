import superagent from 'superagent';
import fs from 'fs';
import path from 'path';

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

export default class Crowller {
  private filePath = path.resolve(__dirname, '../../data/news.json');
  //抽离私有file path

  private async getRawHtml() {
    const result = await superagent.get(this.url); //获取原始html
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async runSpider() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.runSpider();
  }
}
