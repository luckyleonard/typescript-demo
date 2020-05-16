import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key);
    //将接收的middleware注册成为元数据
  };
}
