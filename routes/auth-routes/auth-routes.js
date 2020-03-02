const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
// const sendEmail = require("../../utils/sendMail");

router.post("/create-account", (req, res, next) => {
    // get the data from the frontend

    const incomingData = req.body;
    // validate incoming data using joi
    const { nickname, email } = incomingData;
    // check if provided credentials is not taken
    User.findOne(
        {
            $or: [
                {
                    nickname
                },
                { email }
            ]
        },
        (err, any) => {
            if (err) {
                return res.json({
                    error: true,
                    message: "Ooops something broke"
                });
            }
            if (any) {
                return res.json({
                    error: true,
                    message: "User already Exist, try logging in"
                });
            }

            const schema = joi.object({
                name: joi
                    .string()
                    .min(2)
                    .max(30)
                    .required(),
                password: joi
                    .string()
                    .min(9)
                    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30})")),
                nickname: joi
                    .string()
                    .min(2)
                    .required(),
                email: joi
                    .string()
                    .email()
                    .required()
            });
            let isValid = schema.validate(incomingData);
            if (!isValid.error) {
                let data = isValid.value;
                const { email, name, password, nickname } = data;
                const newUser = new User({
                    email,
                    name,
                    nickname
                });
                // check if there is a user with the sent credentails
                newUser.password = newUser.hashPassword(password);
                return newUser
                    .save()
                    .then(() => {
                        res.status(200).json({
                            error: null,
                            message: "Account created successfully"
                        });
                    })
                    .catch((err) => {
                        return res.status(400).json({
                            error: true,
                            message: "Something went wrong, could't create account"
                        });
                    });
            } else {
                res.json({
                    error: true,
                    message: "Invalid data provided, please check data"
                });
            }
        }
    );
});
router.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ $or: [{ email: username }, { nickname: username }] }, (err, any) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: "oops something went wrong"
            });
        }

        if (!any) {
            return res.json({
                error: true,
                message: "Invalid Credentials Provided"
            });
        }

        const passwordIsValid = bcrypt.compareSync(password, any.password);
        if (!passwordIsValid) {
            return res.json({
                error: true,
                message: "Invalid Credentials Provided"
            });
        }

        let user = { ...any._doc };
        delete user.password;
        let token = jwt.sign({ user }, process.env.JWT_SECRET);
        return res
            .cookie("ssid", token, {
                maxAge: Date.now() + 25920000,
                httpOnly: true
            })
            .json({
                error: null,
                message: "Login successful",
                user
            });
    });
});

router.post("/verify-authentication", (req, res, next) => {
    const { ssid } = req.cookies;
    if (ssid) {
        const data = jwt.verify(ssid, process.env.JWT_SECRET);
        if (data) {
            const { user } = data;
            return res.status(200).json({
                error: false,
                user
            });
        } else {
        }
    }
    return res.json({
        error: true,
        message: "Unauthorized",
        user: null
    });
});

// router.post("/request-password-reset", (req, res) => {
//     const { email } = req.body;
//     User.findOne({ email }, (err, user) => {
//         if (err) {
//             return res.json({
//                 error: true,
//                 message: "Oops something went wrong"
//             });
//         }
//         if (!user) {
//             return res.json({
//                 error: true,
//                 message: "Email doesn't appear in our database"
//             });
//         }
//         let data = {
//             from: "noreply@soud.com",
//             to: email,
//             subject: "Password Reset",
//             text: "This will reset your password"
//         };
//         let sendResetEmail = sendEmail(data);
//         sendResetEmail.then(() => {}).catch((err) => {});
//         res.json({
//             error: null,
//             message: "Email has been sent to provided mail"
//         });
//     });
// });
module.exports = router;
