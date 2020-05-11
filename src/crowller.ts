import superagent from 'superagent';
import fs from 'fs';
import path from 'path';
import NewsAnalyzer from './newsAnalyzer';

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/news.json');
  //抽离私有file path

  async getRawHtml() {
    const result = await superagent.get(this.url); //获取原始html
    return result.text;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  async runSpider() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.runSpider();
  }
}
const url = `https://news.ycombinator.com/`;

const analyzer = new NewsAnalyzer();
new Crowller(url, analyzer);
