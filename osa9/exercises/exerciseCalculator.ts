interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculator = (dailyHours: Array<number>): Result => {
  const trainingDays = dailyHours.filter(d => d != 0).length;
  const averageHours = dailyHours.reduce((a, b) => a + b) / dailyHours.length;
  const target = 2;

  const newResult = {
    periodLength: dailyHours.length,
    trainingDays: trainingDays,
    success: averageHours >= target,
    rating: 0,
    ratingDescription: '',
    target: target,
    average: averageHours
  };

  if (newResult.success) {
    newResult.rating = 3;
    newResult.ratingDescription = 'well done!';
  } else if (newResult.average > target - 1) {
    newResult.rating = 2;
    newResult.ratingDescription = 'not too bad but could be better';
  } else {
    newResult.rating = 1;
    newResult.ratingDescription = 'could be better';
  }

  return newResult;
};

const parseArguments = (args: Array<string>): Array<number> => {
  args.shift();
  args.shift();

  if (args.length < 1) throw new Error('Not enough arguments');

  return args.map(a => {
    if (!isNaN(Number(a)))
      return Number(a);
    else
      throw new Error('Provided values were not numbers!');
  });
};

try {
  const inputArr = parseArguments(process.argv);
  console.log(calculator(inputArr));
} catch (e) {
  console.log('Error, something bad happened, message: ', 'Provided values were not numbers!');
}


