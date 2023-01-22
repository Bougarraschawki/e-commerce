const express = require('express');
const router = express.Router();
const {userById} = require('../middlewares/user')



const {createCategory,categoryById ,showCategory} = require('../controllers/categoryController');

const {requireSignIn, isAuth , isAdmin} = require('../middlewares/auth');

// router.get("/:categoryId", showCategory);

router.post('/create/:userId', [requireSignIn, isAuth , isAdmin], createCategory);

router.param('userId', userById);

// router.param("categoryId", categoryById);

module.exports = router; 