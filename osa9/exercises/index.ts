import express from 'express';
import { calculateBmi } from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const a = req.query.height;
  const b = req.query.weight;

  if (isNaN(Number(a)) || isNaN(Number(b)) || a === '' || b === '')
    res.status(400).json({ error: "malformatted parameters" });
  else {
    const responseObject = {
      weight: Number(a),
      height: Number(b),
      bmi: calculateBmi(Number(a), Number(b))
    };
    res.json(responseObject);
  }
});

interface Input {
  daily_exercises: Array<number>,
  target: number
}

app.post('/exercises', (request, response) => {
  let exercises: Input;
  try {
    exercises = request.body as Input;
    if (!exercises.daily_exercises || !exercises.target) {
      throw new Error("parameters missing");
    }
    else if (!Array.isArray(exercises.daily_exercises) || isNaN(exercises.target)) {
      throw new Error("malformatted parameters");
    }
    response.json(calculateExercises(exercises.daily_exercises, exercises.target));
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const errorMessage : unknown = error.message;
    response.json(errorMessage);
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
