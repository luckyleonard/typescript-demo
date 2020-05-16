import express, { Request, Response, NextFunction } from 'express';
import './controller/LoginController'; //引入类，执行装饰器
import './controller/CrowllerController';
import { router } from './controller/decorator';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
  req.myName = 'leonard'; //添加的myname并不被Request支持
  next();
});

app.use(
  cookieSession({
    name: 'session',
    keys: ['leonard-secret'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(router);

app.listen(7001, () => {
  console.log('server is run on port 7001');
});
