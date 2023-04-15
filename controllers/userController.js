const { User } = require('../models');

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch((err) => {
                console.error({ message: err})
                return res.status(500).json(err)
            })
    },

    //get user by ID
    getSingleUser(req, res) {
        User.find({_id: req.params.userId})
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user with that ID'})
                    : res.status(200).json(user)
            })
            .catch((err) => res.status(500).json(err))
    },

    //post new user
    createUser(req, res) {

    },
    //update a user
    updateUser(req, res) {

    },
    //delete user + thoughts (cascade)
    deleteUser(req, res) {

    },

    //add friend
    addFriend(req, res) {

    },
    //delete friend
    deleteFriend(req, res) {

    }
}