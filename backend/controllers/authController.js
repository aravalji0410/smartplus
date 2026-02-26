const { create } = require("node:domain");
const User = require("../models/User");

const userController = {
    //GET /users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAllUsers()
            console.log("** GET getAllUsers NOT SUCCESSFULL **");
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch users" });}
            console.log("** GET getAllUsers **");
            
        },
        // post createuser
        create: async (req, res) => {
            const { name, email } = req.body;
            if (!name || !email) {
                 console.log("** GET getAllUsers NOT SUCCESSFULL **");
                return res.status(400).json({ error: "Name and email are required" });
            }
            try {
                const userId = await User.create(name, email);
                res.status(201).json({ message: `User created with ID: ${userId}`, name, email });
            } catch (err) {
                 console.log("** GET getAllUsers NOT SUCCESSFULL **");
                res.status(500).json({ error: err});}
            }
            };

            module.exports = userController;