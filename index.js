const mongoose = require("mongoose");
const yargsInteractive = require("yargs-interactive");

const list = require("./options/list");
const add = require("./options/add");
const remove = require("./options/remove");

const MONGO_URL = process.env.PERSONAL_WEBSITE_MONGO_URL;

if (!MONGO_URL) {
  console.log("PERSONAL_WEBSITE_MONGO_URL envirnment variable not found");
  process.exit();
}

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

yargsInteractive()
  .usage("$0 <command> [args]")
  .interactive({
    interactive: { default: true },
    option: {
      type: "list",
      choices: ["List admins", "Add admin", "Remove admin"],
      describe: "What would you like to do"
    }
  })
  .then(async ({ option }) => {
    if (option === "List admins") await list();
    if (option === "Add admin") await add();
    if (option === "Remove admin") await remove();
    console.log("bye");
    process.exit();
  });
