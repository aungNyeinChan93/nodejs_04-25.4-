const bcrypt = require('bcryptjs');

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


module.exports = {
    response, Base, Encoder
}