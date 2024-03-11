console.log("03_create_users.js STARTING");

let user1 = db.users.findOne({ username: "user1@recipe.it" });
if (!user1) {
  console.log("user1 NOT FOUND, creating");
  user1 = {
    username: "user1",
    password: "$2b$10$mUEWHwiklyWX2KI4A0SipOyz6ZICKcgaFy56VqhYuTm.oeNlu.eJq",
  };
  db.users.insertOne(user1);
}

console.log("03_create_users.js COMPLETED");
