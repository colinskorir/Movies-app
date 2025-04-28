const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Example user data (in a real app, you would use a database)
const users = [
  { id: 1, username: "user1", password: "$2a$10$T4uMvziJMGbEMO1z6G2uM.teUbM7nwr5LwHG7vY9HQl5wkcZj7hyu" } // password is "password123"
];

const authenticateUser = (username, password) => {
  const user = users.find((user) => user.username === username);
  if (!user) return null;

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return null;

  const token = jwt.sign({ id: user.id, username: user.username }, "your-secret-key", { expiresIn: "1h" });

  return { user, token };
};

module.exports = { authenticateUser };
