import { Router } from 'express';
export default Router();

// import fs from 'fs';
// import path from 'path';
// import Crowller from './utils/crowller';
// import NewsAnalyzer from './utils/newsAnalyzer';
// import { getResponseData } from './utils/util';

// interface RequestWithBody extends Request {
//   body: {
//     [key: string]: string | undefined; //泛匹配,body下属性都是string | undefined
//   };
// }

// const checkLogin = (
//   req: RequestWithBody,
//   res: Response,
//   next: NextFunction
// ) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     next();
//   } else {
//     res.json(getResponseData(null, `please login <a href='/'>login</a>`));
//   }
// };

// router.get('/', () => {});

// router.post('/login', (req: RequestWithBody, res: Response) => {
//   const { password, username } = req.body;
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     res.json(getResponseData(false, 'repeat login'));
//   } else {
//     if (password === '123' && req.session) {
//       req.session.login = true;
//       res.json(getResponseData(true));
//     } else {
//       res.json(getResponseData(false, 'wrong password'));
//     }
//   }
// });

// router.get('/logout', (req: Request, res: Response) => {
//   if (req.session) {
//     req.session.login = undefined;
//   }
//   res.json(getResponseData(true));
// });

// router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
//   const url = `https://news.ycombinator.com/`;
//   const analyzer = NewsAnalyzer.getInstance();
//   new Crowller(url, analyzer);
//   res.json(getResponseData(true));
// });

// router.get('/showData', checkLogin, (req: RequestWithBody, res: Response) => {
//   try {
//     const filePath = path.resolve(__dirname, '../data/news.json');
//     const result = fs.readFileSync(filePath, 'utf-8');
//     res.json(getResponseData(JSON.parse(result)));
//   } catch (e) {
//     res.json(getResponseData(false, 'get data first'));
//   }
// });
