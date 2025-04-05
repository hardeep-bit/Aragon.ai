const db = global.app.db;

export const createTask = async (req, res) => {
    const { name, boardId } = req.body;
    try {
        const task = await db.task.findOne({ boardId, name: new RegExp(`^${name}$`, 'i') });

        if (task) {
            return res.failure('Task Already Exists');
        }

        const newTask = await db.task.create({
            name,
            boardId,
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

export const getTasks = async (req, res) => {
    const { boradId } = req.params;
    try {
        const tasks = await db.task.find({ boradId });
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
    const { taskId } = req.params;
    const updates = req.body;
    updates.updatedAt = Date.now();

    try {
        const updated = await db.task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!updated) return res.failure("Task not found");
        return res.data(updated);
    } catch (error) {
        return res.failure(error.message);
    }
};