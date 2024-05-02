import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async(req, res) => {
    const { username, email, password, securityAns } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword, securityAns});

    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
    
};

export const signin = async(req, res) =>{
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser)
            return res.status(400).json({message: "User Not Found"});
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword)
            return res.status(400).json({message: "Invalid Credentials"});
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("access_token", token, { httpOnly: true }).status(201).json(validUser);

    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async(req, res) => {
    const { email, securityAns, newPassword } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser)
            return res.status(400).json({ message: "User Not Found" });
        const validSecurityAns = (securityAns === validUser.securityAns);
        if (!validSecurityAns)
            return res.status(400).json({ message: "Invalid Security Answer" });
        const hashPassword = bcryptjs.hashSync(newPassword, 10);
        validUser.password = hashPassword;
        await validUser.save();
        res.status(201).json({ message: "Password Updated Successfully" });

    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const signout = async(req, res) => {
    res.clearCookie("access_token").json({ message: "Signout Successfully" });
};

