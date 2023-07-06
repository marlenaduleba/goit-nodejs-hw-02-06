const express = require("express");
const { contacts } = require("../../controllers");

const {
  auth,
  contactJoi,
  favoriteJoi,
  isValidId,
  validation,
} = require("../../middleware");

const validContact = validation(contactJoi);
const validFavorite = validation(favoriteJoi);

const router = express.Router();

router.get("/", auth, contacts.getAll);
router.get("/:contactId", auth, isValidId, contacts.getContactById);
router.post("/", auth, validContact, contacts.addContact);
router.delete("/:contactId", auth, isValidId, contacts.removeContact);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validContact,
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validFavorite,
  contacts.updateContactStatus
);

module.exports = router;
