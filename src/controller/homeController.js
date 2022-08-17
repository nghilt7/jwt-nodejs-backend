import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  const name = "nghilt";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  const allUser = await userService.getAllUser();
  return res.render("user.ejs", { allUser });
};

const handleCreateNewUser = async (req, res) => {
  const {
    body: { email, password, username },
  } = req;

  await userService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  await userService.deleteUser(id);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  const {
    params: { id },
  } = req;
  let userData = {};
  const user = await userService.getUserById(id);
  userData = user;
  res.render("user-update.ejs", { user: userData });
};

const postUpdateUser = async (req, res) => {
  const {
    body: { email, username, id },
  } = req;
  await userService.updateUser(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  postUpdateUser,
};
