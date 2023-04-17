const { User, Thought } = require('../models');

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

    //create new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.status(201).json(user))
        .catch((err) => res.status(500).json(err));
    },
    //update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: { username: req.body.username } },
          )
            .then((user) => {
                if(!user){
                    return res.status(404).json({ message: 'No user with this id!' })
                }
                Thought.updateMany(
                    { username: user.username},
                    { $set: { username: req.body.username } } 
                ).then(
                    res.status(200).json({message: 'User updated!' })
                )
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
    //delete user + thoughts (cascade)
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => {
            console.log(user)
            if(!user){
                return res.status(404).json({message: 'No user with this id',})
            }
            Thought.deleteMany(
                { username: user.username},
                { $set: { username: req.body.username } }
            ).then((thought) =>
                res.status(200).json(user)
            )
        })
    },

    //add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id : req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
          ).then((user) =>
          !user
          ? res.status(404).json({ message: 'No user with that id'})
          : res.status(200).json(user)
      )
    },
    //delete friend
    deleteFriend(req, res) {
        User.updateOne(
            { _id: req.params.userId },
            { $pull: { friends:  req.params.friendId } },
            ).then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that id'})
            : res.status(200).json(user)
        )
    }
}