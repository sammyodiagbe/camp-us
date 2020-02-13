const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");
const sendEmail = require("../../utils/sendMail");

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
                firstname: joi
                    .string()
                    .min(2)
                    .max(30)
                    .required(),
                lastname: joi
                    .string()
                    .min(2)
                    .max(30)
                    .required(),
                password: joi
                    .string()
                    .min(9)
                    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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
                const { email, firstname, lastname, password, nickname } = data;
                const newUser = new User({
                    email,
                    lastname,
                    firstname,
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
    const { emailOrUsername, password } = req.body;
    User.findOne(
        { $or: [{ email: emailOrUsername }, { nickname: emailOrUsername }] },
        (err, any) => {
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

            return res.json({
                error: null,
                message: "Login successful"
            });
        }
    );
});

router.post("/request-password-reset", (req, res) => {
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.json({
                error: true,
                message: "Oops something went wrong"
            });
        }
        if (!user) {
            return res.json({
                error: true,
                message: "Email doesn't appear in our database"
            });
        }
        let data = {
            from: "noreply@soud.com",
            to: email,
            subject: "Password Reset",
            text: "This will reset your password"
        };
        let sendResetEmail = sendEmail(data);
        sendResetEmail.then(() => {}).catch((err) => {});
        res.json({
            error: null,
            message: "Email has been sent to provided mail"
        });
    });
});
module.exports = router;
