import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHelloWorld = (req, res) => {
  const name = "nghilt";
  return res.render("home.ejs", { name });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  const {
    body: { email, password, username },
  } = req;

  // simple query
  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, password, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log(results); // results contains rows returned by server
    }
  );

  return res.send("Create ");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
