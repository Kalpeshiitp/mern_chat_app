const express = require('express');
const { registerUser, authUser, allUser, allUsers } = require('../controllers/userControlles');
const { protect } = require('../middleware/authorization');

const router = express.Router();

router.route("/").post(registerUser).get(protect,allUsers);
router.post("/login", authUser);

module.exports = router;