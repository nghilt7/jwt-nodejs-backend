import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

// salt password
const salt = bcrypt.genSaltSync(10);

const createConnectDatabase = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  return connection;
};

const hashUserPassword = (password) => {
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  const connection = await createConnectDatabase();

  try {
    await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashPassword, username]
    );
  } catch (error) {
    console.log(">>> Error", error);
  }
};

const getAllUser = async () => {
  // create the connection, specify bluebird as Promise
  const connection = await createConnectDatabase();

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.log(">>> Error", error);
  }
};

const deleteUser = async (id) => {
  const connection = await createConnectDatabase();

  try {
    await connection.execute("DELETE FROM users WHERE id=?", [id]);
  } catch (error) {
    console.log(">>> Error", error);
  }
};

const getUserById = async (id) => {
  const connection = await createConnectDatabase();

  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM users WHERE id=?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(">>> Error", error);
  }
};

const updateUser = async (email, username, id) => {
  const connection = await createConnectDatabase();

  try {
    await connection.execute(
      "UPDATE users SET email=?, username=? WHERE id=?",
      [email, username, id]
    );
  } catch (error) {
    console.log(">>> Error", error);
  }
};

module.exports = {
  createNewUser,
  getAllUser,
  deleteUser,
  getUserById,
  updateUser,
};
