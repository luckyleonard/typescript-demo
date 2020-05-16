export enum Method {
  get = 'get',
  post = 'post',
}

function getRequestDecorator(type: Method) {
  return function (path: string) {
    return function (target: any, key: string) {
      //由两层工厂包裹的真正装饰器
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export const get = getRequestDecorator(Method.get);
export const post = getRequestDecorator(Method.post);
