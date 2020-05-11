"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var NewsAnalyzer = /** @class */ (function () {
    function NewsAnalyzer() {
    }
    NewsAnalyzer.getInstance = function () {
        if (!NewsAnalyzer.instance) {
            NewsAnalyzer.instance = new NewsAnalyzer();
        }
        return NewsAnalyzer.instance;
    };
    NewsAnalyzer.prototype.getJsonInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var newsItems = $('.athing');
        var newsInfos = []; //存储爬取出的News列表
        newsItems.each(function (index, newsItem) {
            //cheerio的自带方法，格式必须按照规定写
            var title = $(newsItem).find('.storylink').text();
            var website = $(newsItem).find('.sitestr').text();
            newsInfos.push({ title: title, website: website });
        });
        return {
            time: new Date().getTime(),
            data: newsInfos,
        };
    };
    NewsAnalyzer.prototype.generateJsonContent = function (newsInfo, filePath) {
        var fileContent = {}; //暂存Json格式的文件内容
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[newsInfo.time] = newsInfo.data;
        return fileContent;
    };
    NewsAnalyzer.prototype.analyze = function (html, filePath) {
        var newsInfo = this.getJsonInfo(html);
        var fileContent = this.generateJsonContent(newsInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return NewsAnalyzer;
}());
exports.default = NewsAnalyzer;
