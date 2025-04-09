const { RDB } = require('./base')
const localStorage = require('local-storage');

const setUserCache = async (id, user) => {
    // await RDB.set(id, user)
    localStorage.set(id, user)
}

const getUserCache = async (id) => {
    // return await RDB.get(id);
    return JSON.parse(localStorage.get(id))
}

const clearUserCache = (id) => {
    localStorage.remove(id)
}

module.exports = {
    setUserCache, getUserCache, clearUserCache
}