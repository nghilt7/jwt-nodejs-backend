import userService from "../service/userService";

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

  // userService.createNewUser(email, password, username);
  userService.getAllUser();

  return res.send("Create ");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
