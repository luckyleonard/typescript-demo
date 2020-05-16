import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    const originMiddlewares = Reflect.getMetadata('middlewares',target,key)|| [];
    //第一次使用use为空数组，下次则先会取出middlewares,然后把新加入的middleware推进去
    originMiddlewares.push(middleware);
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    //将接收的middleware注册成为元数据
  };
}
