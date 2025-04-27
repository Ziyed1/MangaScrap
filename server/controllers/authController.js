const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register (Inscription)
exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error('Erreur attrapée dans register:', error)
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Login (Connexion)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
