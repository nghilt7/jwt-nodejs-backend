import bcrypt from "bcryptjs";
import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

// salt password
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPassword, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getAllUser = () => {
  let users = [];
  connection.query("SELECT * FROM users", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
};
