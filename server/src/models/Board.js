import {
    Schema,
    model
} from 'mongoose';

const board = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
});

//pre tasks
board.pre('save', function () {
    this.updatedAt = Date.now();
    return Promise.resolve(this);
});

model('board', board);