const mysql = require("mysql2");
const config = require("./config");

// Create connection using centralized config
const db = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
});

// Connect
db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL");
});

module.exports = db;