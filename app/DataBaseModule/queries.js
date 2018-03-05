const getUsers = 'SELECT * FROM users';
const getSingleUser = 'SELECT * FROM users WHERE email = ?';
const setUser = "INSERT INTO users (email, password) VALUES ?"

module.exports = {
    getUsers,
    getSingleUser,
    setUser
}