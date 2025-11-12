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
    body('email', 'Enter a valid email').toLowerCase().isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    // If there are erros, return Bad request and the error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether the user with email already.
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
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
        success = true;
        // Send success:true and token as message of user creation
        res.json({success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).json(success, "Internal Server Error");
    }
    // .then(user => res.json(user)).catch(err => console.log(err));
});



// Route 2 Authenticate a User using: POST "/api/auth/login", no login required

router.post('/login', [
    body('email', 'Enter a valid email').toLowerCase().isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false;
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
            success= false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });


    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }

});

// Route 3: Get Loged in User Detials using: POST "api/auth/getuser". No login required
router.get('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(400).json({success: false, error:"User not found"})

        }
        res.status(200).json({success: true, user});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, error: "Internal Server Error"});
    }

})

// updatename api for update name
router.put('/update-name', fetchuser, async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { name },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Update error:", error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
})


// PUT: Update user email
router.put('/update-email', fetchuser, async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email format (basic)
        if (!email || !email.includes('@')) {
            return res.status(400).json({ success: false, error: "Invalid email format" });
        }

        // Update email in DB
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { email },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Update email error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// password update 
router.put('/update-password', fetchuser, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, error: "Please provide current and new password" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword + PEPPER, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Current password is incorrect" });
        }

        const isSamePassword = await bcrypt.compare(newPassword + PEPPER, user.password);
        if (isSamePassword) {
            return res.status(400).json({ success: false, error: "New password must be different from the current password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword + PEPPER, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Password update error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// account deletion
router.delete('/accdelete', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, error: "Password is required" });
    }

    // ✅ Include password field for bcrypt
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const pepper = process.env.PEPPER || '';
    const isMatch = await bcrypt.compare(password + pepper, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Incorrect password" });
    }

    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: "Account deleted successfully" });

  } catch (error) {
    console.error("❌ Delete account error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error", details: error.message });
  }
});


module.exports = router;