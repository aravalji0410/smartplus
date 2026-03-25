const db = require("../config/db");

const User = {
    getAllUsers: async function() {
        const [rows] = await db.query("SELECT * FROM Users");
        return rows;
    },
    create: async function(name, email, password) {
        const sql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, { replacements: [name, email, password] });
        return result.insertId;
    },
    findById: async function(id) {
        const sql = "SELECT * FROM Users WHERE id = ?";
        const [rows] = await db.query(sql, { replacements: [id] });
        return rows[0];
    },
    findByEmail: async function(email) {
        const sql = "SELECT * FROM Users WHERE email = ?";
        const [rows] = await db.query(sql, { replacements: [email] });
        return rows[0];
    }
};

module.exports = User;
