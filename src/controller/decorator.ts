import { Router, RequestHandler } from 'express';
export const router = Router();

enum Method {
  get = 'get',
  post = 'post',
}

export function controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);
    //取得装饰器中的路由路径
    const method: Method = Reflect.getMetadata('method', target.prototype, key);
    //取得HTTP方法
    const handler = target.prototype[key];
    //取得函数名
    const middleware = Reflect.getMetadata('middleware', target.prototype, key);
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler);
        //加入middleware
      } else {
        router[method](path, handler);
        //router不能接受一个any类型的参数 所以需要指定一个enum类声明method
      }
    }
  }
}

function getRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      //由两层工厂包裹的真正装饰器
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key);
    //将接收的middleware注册成为元数据
  };
}
