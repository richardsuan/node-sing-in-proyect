const jwt = require('jsonwebtoken');
const secrectKey = '1234Secreto';
function authenticationToken(req, res, next) {
    const token = req.headers['auth'];
    if (!token) {
        return res.status(401).json({ mensaje: 'No se proporcionó el token' });
    }
    jwt.verify(token, secrectKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}
module.exports = {
    authenticationToken
};