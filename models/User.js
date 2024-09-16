const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

const userSchema = new Schema(
    {
        username:
    },
    {
        email:
    },
    {
        thoughts:
    },
    {
        friends:
    }
)

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;