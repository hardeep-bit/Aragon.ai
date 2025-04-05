import {
    Schema,
    model
} from 'mongoose';

const task = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'board',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'todo',
        enum: ['todo', 'doing', 'done'],
        required: true,
    },
    createdAt: Date,
    updatedAt: Date,
});

//pre tasks
task.pre('save', function () {
    this.updatedAt = Date.now();
    return Promise.resolve(this);
});

model('task', task);