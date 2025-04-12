const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis_client = require("./redis")
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const { timeStamp } = require('console');

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

    const deleteImage = (url) => {
        const fileName = url.split('/').pop();
        const filePath = path.join(__dirname, '../public/images', fileName);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    return { print, alert, deleteImage };
}

const Encoder = {
    encode: (password) => bcrypt.hashSync(password),
    compare: (origin, hash) => bcrypt.compareSync(origin, hash),
}

const JWT = {
    loginToken: (payload) => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" }),
    specialToken: (payload) => jwt.sign(payload, process.env.SECRET_KEY),
    verify: (token, next) => jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new Error(err.message))
        }
        return decoded;
    }),
}

const RDB = {
    set: async (key, value) => await redis_client.set(key, JSON.stringify(value)),
    get: async (key) => JSON.parse(await redis_client.get(key)),
    clear: async (key) => await redis_client.flushall(key)
}

const MOMENT = {
    now: () => moment.tz('Asia/Yangon').format('DD-MM-YYYY'),
    timeStamp: () => moment.tz('Asia/Yangon').unix(),
}

const ErrorFile = {
    write: (payload) => {
        let fileName = MOMENT.now() + "_anc_" + MOMENT.timeStamp() + ".txt";
        let filePath = path.join(__dirname, "../logger/errors/") + fileName;
        fs.writeFileSync(filePath, JSON.stringify(payload), { encoding: "utf-8" });
    },
    read(payload) {
        let filePath = path.join(__dirname, "../logger/errors/") + payload;
        const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return JSON.parse(data);
    }
}


module.exports = {
    response, Base, Encoder, JWT, RDB, MOMENT, ErrorFile
}