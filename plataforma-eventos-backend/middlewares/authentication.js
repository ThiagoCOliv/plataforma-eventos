const jwt = require('../utils/jwt');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    try 
    {
        const decoded = jwt.verifyToken(token);
        req.user = decoded.sub;
        next();
    } 
    catch (err) 
    {
        console.error('Token verification error:', err.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;