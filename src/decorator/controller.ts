import { RequestHandler } from 'express';
import router from '../router';
import { Method } from './requests';

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    //target是构造函数 也就是类
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key);
      //取得装饰器中的路由路径
      const method: Method = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );
      //取得HTTP方法
      const handler = target.prototype[key];
      //就在这个handler上写装饰器，所以一定存在
      //取得类中的函数或属性名
      const middleware: RequestHandler = Reflect.getMetadata(
        'middleware',
        target.prototype,
        key
      );
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        if (middleware) {
          router[method](fullPath, middleware, handler);
          //加入middleware
        } else {
          router[method](fullPath, handler);
          //router不能接受一个any类型的参数 所以需要指定一个enum类声明method
        }
      }
    }
  };
}
