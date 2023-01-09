const User = require('../models/user');
exports.getOneUser = (req, res) => {
    res.json({
        user: req.profile
    })
}