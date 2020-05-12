interface Bird {
  fly: boolean;
  sing: () => {};
}
interface Dog {
  fly: boolean;
  bark: () => {};
}

function trainAnimal(animal: Bird | Dog): void {
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
  if ('sing' in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

function add(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`;
  }
  return first + second;
}

class NumberObj {
  count: number;
  constructor(count: number) {
    this.count = count;
  }
}

function addSecond(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
