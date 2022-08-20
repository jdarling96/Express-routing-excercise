const express = require("express");
const ExpressError = require("./expressError");

const app = express();

app.get("/mean", (req, res, next) => {
  let total = 0;
  let count = 0;
  let query = req.query["nums"].split(",");

  console.log(query);
  try {
    query.forEach((n, idx) => {
      if (n === "") throw new ExpressError("nums are required", 400);
      if (!Number(n)) throw new ExpressError(`${n} is not a number`, 400);
      console.log(n);
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
