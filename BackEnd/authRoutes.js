const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('./db');
require('dotenv').config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [first_name, last_name, email, hashedPassword, role],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Registration failed" });

            const verificationLink = `http://localhost:3005/auth/verify-email?email=${email}`;
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Verify your Email",
                text: `Click the link to verify your email: ${verificationLink}`
            });

            res.json({ message: "User registered. Check your email for verification." });
        }
    );
});

router.get('/verify-email', (req, res) => {
    const { email } = req.query;
    db.query("UPDATE users SET is_verified = 1 WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ error: "Email verification failed" });
        res.send("Email verified successfully!");
    });
});

router.post('/admin-login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "User not found" });

        const user = results[0];
        if (user.role !== "admin") {
            return res.status(403).json({ error: "You are not allowed to login from here" });
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        if (!user.is_verified) {
            return res.status(400).json({ error: "Email not verified" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    });
});

module.exports = router;
