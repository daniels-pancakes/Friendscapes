const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            minLength: 1,
            maxLength: 280,
            required: true, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: { 
            type: String, 
            required: true, 
        },
        reactions: [Reaction]
    },  
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

function formatDate(date) {
    let formattedDate = date.toLocaleString();
    return formattedDate;
}

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;