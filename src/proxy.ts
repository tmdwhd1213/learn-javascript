interface Target {
  name: string;
  age: number;
}

// 대상 객체
const targetObject: Target = {
  name: "John",
  age: 30,
};

const loggingProxy = new Proxy(targetObject, {
  get: (target, property, receiver): ProxyHandler<Target> => {
    console.log(`속성 ${String(property)}에 접근`);
    return Reflect.get(target, property, receiver);
  },

  set: (target, property, value, receiver) => {
    console.log(
      `target: ${Object.values(
        target
      )}에 속성 ${property.toString()}에 ${value}값을 할당. receiver: ${Object.values(
        receiver
      )}`
    );
    return Reflect.set(target, property, value, receiver);
  },
});

// 프록시를 통한 속성 접근
console.log(loggingProxy.name);
loggingProxy.age = 35;
