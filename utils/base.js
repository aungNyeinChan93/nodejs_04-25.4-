const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const response = (res, message = '', result = {}, status = 200) => {
    res.status(status).json({
        message,
        result
    })
};


const Base = () => {

    const print = (message = '') => {
        console.log(`${message}`);
    };

    const alert = (mess = '') => {
        alert(mess)
    }

    return { print, alert };
}

const Encoder = {
    encode: (password) => bcrypt.hashSync(password),
    compare: (origin, hash) => bcrypt.compareSync(origin, hash),
}

const JWT = {
    loginToken: (payload) => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" }),
    // verify: (token) => jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    //     if (err) {
    //         return err
    //     }
    //     if (decoded) {
    //         return decoded
    //     }
    // }),
}

module.exports = {
    response, Base, Encoder, JWT
}