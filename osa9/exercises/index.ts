import express from 'express';
import { calculateBmi } from './bmiCalculator';

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



app.post('/exercises', (request, _response) => {

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any =  request.body;

  console.log(body.daily_exercises);
  console.log(body);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
