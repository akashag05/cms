const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyparser = require("body-parser");
var app = express();
//Configuring express server
app.use(
  bodyparser.json(),
  cors({
    origin: "*",
  })
);

//MySQL details
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mission500",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get("/users", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Router to INSERT/POST a learner's detail
app.post("/addusers", (req, res) => {
  console.log(req.body);
  let user = req.body;
  var sql =
    "SET @userid = ?;SET @userName = ?;SET @userEmail = ?;SET @userPassword = ?;SET @userStatus = ?;CALL userAddOrEdit(@userid, @userName, @userEmail, @userPassword, @userStatus);";
  mysqlConnection.query(
    sql,
    [
      user.userid,
      user.userName,
      user.userEmail,
      user.userPassword,
      user.userStatus,
    ],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor == Array) res.send(200);
        });
      else console.log(err);
    }
  );
});

//Router to UPDATE a learner's detail
app.put("/editUser", (req, res) => {
  let user = req.body;
  var sql =
    "SET @userid = ?;SET @userName = ?;SET @userEmail = ?;SET @userStatus = ?;CALL userAddOrEdit(@userid, @userName, @userEmail, @userPassword, @userStatus);";
  mysqlConnection.query(
    sql,
    [user.userid, user.userName, user.userEmail, user.userStatus],
    (err, rows, fields) => {
      if (!err) res.send("User Details Updated Successfully");
      else console.log(err);
    }
  );
});

//Router to DELETE a learner's detail
app.delete("/deleteuser/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM users WHERE userid = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("User Record deleted successfully.");
      else console.log(err);
    }
  );
});

//Router to get individual user a learner's detail
app.get("/getSingleUser/:id", (req, res) => {
  mysqlConnection.query(
    "Select userid, userName, userEmail, userStatus FROM users WHERE userid = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// ----------------------------Blog API Start Here--------------------------

//Creating GET Router to fetch all the blogs details from the MySQL Database
app.get("/blog", (req, res) => {
  mysqlConnection.query("SELECT * FROM blog", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Configure Multer storage
const upload = multer({ dest: "uploads/" });

// Set up a route to handle form submissions
app.post("/addBlog", upload.single("image"), (req, res) => {
  console.log(req.body);
  const { blog_id, blog_title, blog_image, short_desc, long_desc, status } =
    req.body;
  //   const blog_image = req.file;

  console.log(blog_image);
  //   Check if all required fields are provided
  //   if (
  //     !blog_id ||
  //     !blog_title ||
  //     !short_desc ||
  //     !long_desc ||
  //     !status ||
  //     !blog_image
  //   ) {
  //     return res.status(400).send("Missing required fields");
  //   }

  // Prepare the SQL query
  const sql =
    "INSERT INTO blog (blog_id, blog_title, blog_image, short_desc, long_desc, status) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    blog_id,
    blog_title,
    blog_image,
    short_desc,
    long_desc,
    status,
  ];
  console.log(values);
  // Execute the SQL query
  mysqlConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Failed to insert data into the database:", err);
      return res.status(500).send("Failed to insert data into the database");
    }
    console.log("Data inserted successfully!");
    res.status(200).send("Data inserted successfully");
  });
});

//Router to DELETE a learner's detail
app.delete("/deleteblog/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM blog WHERE blog_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("User Record deleted successfully.");
      else console.log(err);
    }
  );
});

// --------------------------Activity API start here------------------------

app.get("/activities", (req, res) => {
  mysqlConnection.query("SELECT * FROM activities", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});
