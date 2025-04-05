import mongoose from 'mongoose';

const db = global.app.db;

export const createTask = async (req, res) => {
    const { name, boardId, status = 'todo' } = req.body;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        return res.failure('Invalid boardId');
    }

    try {
        const task = await db.task.findOne({ boardId, name: new RegExp(`^${name}$`, 'i') });

        if (task) {
            return res.failure('Task Already Exists');
        }

        const newTask = await db.task.create({
            name,
            boardId,
            status,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        return res.data(newTask);
    } catch (error) {
        return res.failure(error);
    }
}

export const getTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await db.task.findById(taskId);
        if (!task) return res.failure("Task not found");
        return res.data(task);
    } catch (error) {
        return res.failure(error.message);
    }
};

export const getTaskByBoardId = async (req, res) => {
    const { boardId } = req.params;
    try {
        const tasks = await db.task.find({ boardId: boardId });
        return res.page(tasks);
    } catch (error) {
        return res.failure(error.message);
    }
};

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const result = await db.task.findByIdAndDelete(taskId);
        if (!result) return res.failure("Task not found");
        return res.success("Task deleted successfully");
    } catch (error) {
        return res.failure(error.message);
    }
};

export const updateTask = async (req, res) => {
    const { body, params } = req;
    const { taskId, boardId } = params;

    try {
        if (body.name) {
            const task = await db.task.findOne({
                _id: {
                    $ne: taskId,
                },
                boardId: boardId,
                name: new RegExp(`^${body.name}$`, 'i')
            });

            if (task) {
                return res.failure('Task Already Exists');
            }
        }

        body.updatedAt = Date.now();

        const updated = await db.task.findByIdAndUpdate(taskId, body, { new: true });
        if (!updated) return res.failure("Task not found");
        return res.data(updated);
    } catch (error) {
        return res.failure(error.message);
    }
};