const { User, Application } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
       .populate('friends')
       .populate('thoughts')
       .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async addUser(req, res) {
    console.log(req.body);
    try {
      const user = await User.create(req.body);
      const newUser = await User.findOne({ _id: user._id })
       .populate('friends')
       .populate('thoughts')
       .select('-__v');
      res.json(newUser);
    } catch (err) {
      console.error('Error during user creation:', err);
      res.status(500).json(err);
    }
  },
    async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
       { _id: req.params.userId },
       { $set: req.body },
       { runValidators: true, new: true }
      ).populate('friends')
       .populate('thoughts')
       .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
    res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId })
       .populate('friends')
       .populate('thoughts')
       .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(`${user.username} has been deleted`);
    } catch (err) {
      res.status(500).json(err);
    }
  },
    async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
       { _id: req.params.userId },
       { $addToSet: { friends: req.params.friendId } },
       { runValidators: true, new: true }
      ).populate('friends')
       .populate('thoughts')
       .select('-__v');;

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const friend = await User.findById(req.params.friendId);

      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID'});
      }

    res.json(`${friend.username} added to ${user.username}'s friend list`);
    } catch (err) {
      res.status(500).json(err);
    }
  },
    async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId },
       { $pull: { friends: req.params.friendId } },
       { runValidators: true, new: true } 
      ).populate('friends')
       .populate('thoughts')
       .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const friend = await User.findById(req.params.friendId);

      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID'});
      }
      res.json(`${friend.username} has been removed from ${user.username}'s friend list.`)
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
