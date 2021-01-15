const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(express.json());
app.use(cors());

// get all courses
app.get("/courses", async (req, res) => {
  try {
    const allCourses = await pool.query("SELECT * FROM courses");
    res.json(allCourses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all courses for program
app.get("/courses/:program", async (req, res) => {
  try {
    const { program } = req.params;
    const courses_program = await pool.query(
      "SELECT * FROM courses WHERE program = $1",
      [program]
    );

    res.json(courses_program.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000.");
});
