console.log("01_create_user.js STARTING");

db.createUser({
  user: "recipe",
  pwd: "recipe",
  roles: [
    {
      role: "readWrite",
      db: "recipe",
    },
  ],
});

console.log("01_create_user.js COMPLETED");
