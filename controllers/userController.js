const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler( async (req, res) => {
    const{username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    console.log(`User  created ${user}`);
    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    res.json({message: 'Register the user'});
});



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "40m" }
        );

        res.json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});


const currentUser = asyncHandler( async (req, res) => {
    res.json(req.user);
});


module.exports = {registerUser , loginUser , currentUser};