const express = require("express");
const ExpressError = require("./expressError");

const app = express();

app.get("/mean", (req, res, next) => {
  let total = 0;
  let count = 0;
  let query = req.query["nums"].split(",");

  try {
    query.forEach((n, idx) => {
      if (n === "") throw new ExpressError("nums are required", 400);
      if (!Number(n)) throw new ExpressError(`${n} is not a number`, 400);

      total += n;
      count++;
    });
    return res.status(200).json({
      operation: "mean",
      value: total / count,
    });
  } catch (e) {
    return next(e);
  }
});

app.get("/median", (req, res, next) => {
  let query = req.query["nums"].split(",");
  let len = Math.floor(query.length / 2);
  nums = query.sort((a, b) => a - b);
  let value = 0;

  try {
    query.forEach((n, idx) => {
      if (n === "") throw new ExpressError("nums are required", 400);
      if (!Number(n)) throw new ExpressError(`${n} is not a number`, 400);
      value =
        query.length % 2 !== 0 ? query[len] : (query[len - 1] + query[len]) / 2;
    });
    return res.status(200).json({
      operation: "mean",
      value: Number(value),
    });
  } catch (e) {
    return next(e);
  }
});

app.get("/mode", (req, res, next) => {
  let query = req.query["nums"].split(",");
  const obj = {};

  try {
    query.forEach((n) => {
      if (n === "") throw new ExpressError("nums are required", 400);
      if (!Number(n)) throw new ExpressError(`${n} is not a number`, 400);

      if (!obj[n]) {
        obj[n] = 1;
      } else {
        obj[n] += 1;
      }
    });

    let highestVal = 0;
    let highestValKey = -Infinity;

    for (let key in obj) {
      const value = obj[key];

      if (value > highestVal) {
        highestVal = value;
        highestValKey = key;
      }
    }
    return res.status(200).json({
      operation: "mean",
      value: Number(highestValKey),
    });
  } catch (e) {
    return next(e);
  }
});

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.msg;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log("Server running on Port 3000");
});
