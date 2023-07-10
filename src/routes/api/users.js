const express = require("express");
const router = express.Router();

const {
  auth,
  validation,
  userJoi,
  subscriptionJoi,
  emailVerificationJoi,
  upload,
} = require("../../middleware");
const { users } = require("../../controllers");

const validUser = validation(userJoi);
const validSubscription = validation(subscriptionJoi);
const validEmail = validation(emailVerificationJoi);

router.post("/signup", validUser, users.signup);
router.post("/login", validUser, users.login);
router.get("/logout", auth, users.logout);
router.get("/current", auth, users.getCurrent);
router.patch("/", auth, validSubscription, users.updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), users.updateAvatar);
router.get("/verify/:verificationToken", users.verifyByToken);
router.post("/verify", validEmail, users.resendEmail);

module.exports = router;
