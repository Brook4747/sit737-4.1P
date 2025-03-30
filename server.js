const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

// Part2: step3、4&5
// 1: API Endpoint for Addition
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Invalid input. Please provide two numbers.');
  }

  const result = num1 + num2;
  logRequest('addition', num1, num2);
  res.send(`Result: ${result}`);
});

// 2: API Endpoint for Subtraction
app.get('/subtract', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Invalid input. Please provide two numbers.');
  }

  const result = num1 - num2;
  logRequest('subtraction', num1, num2);
  res.send(`Result: ${result}`);
});

// 3: API Endpoint for Multiplication
app.get('/multiply', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Invalid input. Please provide two numbers.');
  }

  const result = num1 * num2;
  logRequest('multiplication', num1, num2);
  res.send(`Result: ${result}`);
});

// 4: API Endpoint for Division
app.get('/divide', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Invalid input. Please provide two numbers.');// If not a number will report error
  }

  if (num2 === 0) {
    return res.status(400).send('Cannot divide by zero.');// Cant division by 0 will report an error
  }

  const result = num1 / num2;
  logRequest('division', num1, num2);
  res.send(`Result: ${result}`);
});

// 4.1C onther 3 Endpoint
// 1: API Endpoint for Exponentiation
app.get('/exponent', (req, res) => {
  const base = parseFloat(req.query.base);
  const exponent = parseFloat(req.query.exponent);

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).send('Invalid input. Please provide both base and exponent.');
  }

  const result = Math.pow(base, exponent);
  logRequest('exponentiation', base, exponent);
  res.send(`Result: ${result}`);
});

// 2: API Endpoint for Square root 
app.get('/sqrt', (req, res) => {
  const num = parseFloat(req.query.num);

  if (isNaN(num)) {
    return res.status(400).send('Invalid input. Please provide a number.');
  }

  if (num < 0) {
    return res.status(400).send('Cannot calculate the square root of a negative number.');
  }

  const result = Math.sqrt(num);
  logRequest('square root', num);
  res.send(`Result: ${result}`);
});

// 3: API Endpoint for Modulo
app.get('/modulo', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Invalid input. Please provide two numbers.');
  }

  if (num2 === 0) {
    return res.status(400).send('Cannot divide by zero.');
  }

  const result = num1 % num2;
  logRequest('modulo', num1, num2);
  res.send(`Result: ${result}`);
});

// Part3
// Setup Winston Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// 4.1C change Helper function for logging each time an arithmetic operation is requested
function logRequest(operation, num1, num2 = null) {
  if (num2 !== null) {
    logger.log({
      level: 'info',
      message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`,
    });
  } else {
    logger.log({
      level: 'info',
      message: `New ${operation} operation requested: ${num1}`,
    });
  }
}

// Start the server
app.listen(port, () => {
  console.log(`calculator-microservice listening at http://localhost:${port}`);
});
