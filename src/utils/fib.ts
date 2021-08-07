const generateFibMap = (numbersToGenerate: number) => {
  const fib = [0, 1];
  const fibMap = {
    0: true,
    1: true,
  };

  for (let index = 2; index < numbersToGenerate; index++) {
    fib[index] = fib[index - 2] + fib[index - 1];
    fibMap[fib[index]] = true;
  }

  return fibMap;
};

const fibMap = generateFibMap(1000);

export const checkIsFib = (number: number) => {
  return !!fibMap[number];
};
