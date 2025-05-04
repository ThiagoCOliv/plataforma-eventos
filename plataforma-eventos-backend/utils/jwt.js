const crypto = require('crypto');

const generateToken = (user) => {
    const header = Buffer.from(JSON.stringify({
        "typ": "JWT",
        "alg": "HS256"
    })).toString('base64');

    const payload = Buffer.from(JSON.stringify({
        iat: new Date().toLocaleString(),
        exp: new Date().setMinutes(60).toLocaleString(),
        iss: "Synera",
        sub: user.id,
    })).toString('base64');

    return header + "." + payload + "." + generateSignature(header, payload);
}

const verifyToken = (token) => {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = generateSignature(header, payload);

    if (signature !== expectedSignature) throw new Error('Invalid token signature');

    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));

    if (decodedPayload.exp < new Date().getTime()) throw new Error('Token expired');

    return decodedPayload;
}

const generateSignature = (header, payload) => {
    return Buffer.from(crypto.createHmac('sha256', process.env.JWT_SECRET).update(header + "." + payload).digest('base64')).toString('base64');
}

module.exports = {
    generateToken,
    verifyToken
}