const User = require("../models/User.model");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");   
const randomCode = require("../../utils/randomCode");

const register = async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
      await User.syncIndexes();
      let confirmationCode = randomCode();
      const userExist = await User.findOne(
        { email: req.body.email },
        { name: req.body.name }
      );
      if (!userExist) {
        const newUser = new User({ ...req.body, confirmationCode });
        if (req.file) {
          newUser.image = req.file.path;
        } else {
          newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
        }
  
        try {
          const userSave = await newUser.save();
          const PORT = process.env.PORT;
          if (userSave) {
            return res.redirect(
              303,
              `http://localhost:${PORT}/api/v1/users/register/sendMail/${userSave._id}`
            );
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        if (req.file) deleteImgCloudinary(catchImg);
        return res.status(409).json("this user already exist");
      }
    } catch (error) {
      if (req.file) {
        deleteImgCloudinary(catchImg);
      }
      return next(error);
    }
  };

  const resendCode = async (req, res, next) => {
    try {
      const email = process.env.EMAIL;
      const password = process.env.PASSWORD;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: email,
          pass: password,
        },
      });
  
      const userExists = await User.findOne({ email: req.body.email });
  
      if (userExists) {
        const mailOptions = {
          from: email,
          to: req.body.email,
          subject: "Confirmation code",
          text: `tu codigo es ${userExists.confirmationCode}`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return res.status(404).json({
              resend: false,
            });
          } else {
            console.log("Email sent: " + info.response);
            return res.status(200).json({
              resend: true,
            });
          }
        });
      } else {
        return res.status(404).json("User not found");
      }
    } catch (error) {
      return next(setError(500, error.message || "Error general send code"));
    }
  };
  

  module.exports = { register, resendCode };
  