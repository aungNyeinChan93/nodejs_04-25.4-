const { response, Encoder, JWT } = require('../utils/base');
const { alert, print } = require('../utils/base').Base();
const { getUserCache, setUserCache } = require('../utils/cache')
const User = require('../models/user_model');
const { encode, compare } = Encoder;

const register = async (req, res, next) => {
    try {
        const input = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            point: req.body.point,
            phone: req.body.phone,
        }

        // required validation
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.role || !req.body.point || !req.body.phone) {
            return response(res, 'Some fields are required', null, 400);
        }

        // unique validation
        const db_name = await User.findOne({ name: req.body.name })
        if (db_name) {
            return response(res, 'Name is already exist', null, 400)
        }
        const db_email = await User.findOne({ email: req.body.email });
        if (db_email) {
            return next(new Error('Email is already exist!'))
        }

        // create user
        input.password = encode(req.body.password) //password encode
        const user = await User(input).save();
        response(res, 'Register Success', user, 201);
        print('Register Success!')

    } catch (err) {
        console.error(err.message)
        next(new Error(err))
    }
}

const login = async (req, res, next) => {
    try {
        const fields = {
            email: req.body.email,
            password: req.body.password,
        }

        const db_user = await User.findOne({ email: fields.email });
        if (!db_user) return next(new Error('Credential Error!'));
        if (!compare(fields.password, db_user.password)) return next(new Error('Credential Error!'));

        // generate token
        const token = JWT.loginToken({ id: db_user._id.toString() })

        // setUserCache(db_user._id.toString(), db_user)
        await setUserCache(db_user._id.toString(), JSON.stringify(db_user))

        response(res, 'Login Success!', { token: token }, 200);
        print("Login Success!")
    } catch (err) {
        next(new Error(err));
    }
}

const profile = async (req, res, next) => {
    try {
        // const user = await User.findById(req.userId).select(['-password', '-_id', "-__v"]);
        const user = await getUserCache(req.userId) // reduce db query!
        if (user) {
            const finalUser = user;
            delete finalUser.password;
            response(res, ' Profile ', finalUser, 200)
        }
    } catch (error) {
        next(new Error(error.message))
    }
}

module.exports = {
    register, login, profile
}