import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

// get the promise implementation, we will use bluebird

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

const getAllUser = async () => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.log(">>> Error", error);
  }

  // let users = [];
  // connection.query("SELECT * FROM users", function (err, results, fields) {
  //   if (err) {
  //     console.log(err);
  //     return users;
  //   }
  //   users = results;
  //   return users;
  // });
};

module.exports = {
  createNewUser,
  getAllUser,
};
