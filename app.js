const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/conn.js");
const dotenv = require("dotenv");
const colors = require("colors");
const tmpDir = path.join(process.cwd(), "tmp");

colors.setTheme({
  success: "cyan",
  error: "red",
});

dotenv.config({ path: "./config/config.env" });

const app = express();

const contactsRouter = require("./src/routes/api/contacts.js");
const usersRouter = require("./src/routes/api/users.js");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
  console.log("Not found".error);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
  console.error(err.message.error);
});

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    createFolderIsNotExist(tmpDir);
    console.log(`Server running. Use our API on port: ${process.env.PORT}`);
  });
});

module.exports = app;
