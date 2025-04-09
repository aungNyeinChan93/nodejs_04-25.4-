const { RDB } = require('./base')
// const localStorage = require('local-storage');

const setUserCache = async (id, user) => {
    await RDB.set(id, user)
    // localStorage.set(id, user)
}

const getUserCache = async (id) => {
    return JSON.parse(await RDB.get(id));
    // return JSON.parse(localStorage.get(id))
}

const clearUserCache = async (id) => {
    // localStorage.remove(id)
    await RDB.clear(id)
}

module.exports = {
    setUserCache, getUserCache, clearUserCache
}