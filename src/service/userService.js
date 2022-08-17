import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

import db from "../models/index";

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
  // const connection = await createConnectDatabase();

  // WAY 1
  // try {
  //   await connection.execute(
  //     "INSERT INTO user (email, password, username) VALUES (?, ?, ?)",
  //     [email, hashPassword, username]
  //   );
  // } catch (error) {
  //   console.log(">>> Error", error);
  // }

  // WAY 2 USE ORM
  let hashPassword = hashUserPassword(password);

  try {
    await db.User.create({
      username,
      email,
      password: hashPassword,
    });
  } catch (error) {
    console.log(">>> Check Error", error);
  }
};

const getAllUser = async () => {
  // WAY 1
  // const connection = await createConnectDatabase();

  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM user");
  //   return rows;
  // } catch (error) {
  //   console.log(">>> Error", error);
  // }

  // WAY 2 USE ORM

  let users = [];
  users = await db.User.findAll();
  return users;
};

const deleteUser = async (id) => {
  // WAY 1
  // const connection = await createConnectDatabase();

  // try {
  //   await connection.execute("DELETE FROM user WHERE id=?", [id]);
  // } catch (error) {
  //   console.log(">>> Error", error);
  // }

  // WAY 2 ORM
  await db.User.destroy({
    where: {
      id,
    },
  });
};

const getUserById = async (id) => {
  // const connection = await createConnectDatabase();

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "SELECT * FROM user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(">>> Error", error);
  // }

  // WAY 2
  let user = {};
  user = await db.User.findOne({
    where: { id },
  });
  return user;
};

const updateUser = async (email, username, id) => {
  // const connection = await createConnectDatabase();
  // try {
  //   await connection.execute("UPDATE user SET email=?, username=? WHERE id=?", [
  //     email,
  //     username,
  //     id,
  //   ]);
  // } catch (error) {
  //   console.log(">>> Error", error);
  // }

  // WAY 2
  await db.User.update(
    { email, username },
    {
      where: {
        id,
      },
    }
  );
};

module.exports = {
  createNewUser,
  getAllUser,
  deleteUser,
  getUserById,
  updateUser,
};
