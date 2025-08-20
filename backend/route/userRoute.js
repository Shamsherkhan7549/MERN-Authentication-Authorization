const express = require('express');
const { createUser, readUsers, user, updateUser, deleteUser, login} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', createUser)
router.get('/readAll', readUsers)
router.get('/update/:_id', user)
router.put('/update',authMiddleware, updateUser)
router.delete('/delete/:_id',authMiddleware, deleteUser)
router.post('/login', login)


module.exports = router