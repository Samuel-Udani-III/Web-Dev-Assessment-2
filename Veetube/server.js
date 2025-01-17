const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();

// Serve the login.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Explicitly serve 'login.html'
});

// Serve static files (HTML, CSS, JS) from 'public' only for other requests
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Log email and hash the password before logging
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        // Log email and hashed password
        console.log(`Email: ${email}, Hashed Password: ${hashedPassword}`);

        // Respond back to the client
        res.send('Login data received and logged!');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
