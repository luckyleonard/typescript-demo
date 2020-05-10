import superagent from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface News {
  title: string;
  website: string;
}

interface NewsStore {
  time: number;
  data: News[];
}

interface FileContent {
  [propName: number]: News[];
}

class Crowller {
  private url = `https://news.ycombinator.com/`;

  getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const newsItems = $('.athing');
    const newsInfos: News[] = [];

    newsItems.map((index, newsItem) => {
      const title = $(newsItem).find('.storylink').text();
      const website = $(newsItem).find('.sitestr').text();
      newsInfos.push({ title, website });
    });

    return {
      time: new Date().getTime(),
      data: newsInfos,
    };
  }

  generateJsonContent(newsInfo: NewsStore) {
    const filePath = path.resolve(__dirname, '../data/news.json');
    let fileContent: FileContent = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[newsInfo.time] = newsInfo.data;
    return fileContent;
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  async runSpider() {
    const filePath = path.resolve(__dirname, '../data/news.json');
    const html = await this.getRawHtml();
    const newsInfo = this.getJsonInfo(html);
    const fileContent = this.generateJsonContent(newsInfo);
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }

  constructor() {
    this.runSpider();
  }
}

const crowller = new Crowller();
