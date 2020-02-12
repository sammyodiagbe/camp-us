const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");

const User = require("../../models/user");

router.post("/create-account", (req, res, next) => {
    // get the data from the frontend

    const incomingData = req.body;
    // validate incoming data using joi
    const { username, email } = incomingData;
    // check if provided credentials is not taken
    User.findOne(
        {
            $or: [
                {
                    username
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
router.get("/login", (req, res, next) => {});
module.exports = router;
