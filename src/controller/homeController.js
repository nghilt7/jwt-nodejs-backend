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

  return res.send("Create ");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
