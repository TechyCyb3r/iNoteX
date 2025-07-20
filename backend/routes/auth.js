require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET;
const PEPPER = process.env.PEPPER;

const express = require("express");
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Route 1 Create a use using: POST "/api/auth/createuser". Doesnt require Auth

router.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {

    // If there are erros, return Bad request and the error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with email already.
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        // create hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password + PEPPER, salt);

        // Create a new User with hash password
        user = await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        // Send message of user creation
        // res.json({ success: true, message: "User created successfully" })
        res.json({ authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    // .then(user => res.json(user)).catch(err => console.log(err));
});



// Route 2 Authenticate a User using: POST "/api/auth/login", no login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    // If there are errors, return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password + PEPPER, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// Route 3: Get Loged in User Detials using: POST "api/auth/getuser". No login required
router.get('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router;