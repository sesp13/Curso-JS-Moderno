// Fizzbuzz

// 3 o multiplo de 3 fizz
// 5 o multiplo de 5 buzz
// de ambos imprimimos fizbuzz

function isMultipleOfN(number, rule) {
  return number % rule == 0;
}

for (let i = 1; i <= 100; i++) {
  const isMultipleOf3 = isMultipleOfN(i, 3);
  const isMultipleOf5 = isMultipleOfN(i, 5);
  const isMultipleOf3and5 = isMultipleOf3 && isMultipleOf5;

  if (isMultipleOf3and5) {
    console.log(`${i} FizzBuzz`);
  } else if (isMultipleOf3) {
    console.log(`${i} Fizz`);
  } else if (isMultipleOf5) {
    console.log(`${i} Buzz`);
  }
}
