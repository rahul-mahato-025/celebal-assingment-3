const express = require("express");
const { default: authenticate } = require("./middlewares/authenticate");

const app = express();

app.use(express.json());

const users = [
  {
    id: 0,
    name: "Rahul",
  },
];

// This route has a middleware which checks whether the user is authenticated before accessing the profile.
app.get("users/:id", authenticate, (req, res) => {
  const user = users.filter((user) => user.id === req.params.id);
  return res.status(200).json({
    data: user,
    err: {},
    message: `User with id ${user.id} fetched successfully.`,
    success: true,
  });
});

app.listen(3001, () => console.log("Server started on port 3000"));
