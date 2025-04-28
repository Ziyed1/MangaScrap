const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Middleware qui va attendre un token JWT pour voir si un user est bien co
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Pas de token, accès refusé' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password'); // mettre user dans req
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide', error: error.message });
    }
};

module.exports = { protect };
