const db = global.app.db;

export const createBoard = async (req, res) => {
    const { name } = req.body;
    try {
        const board = await db.board.findOne({ name: new RegExp(`^${name}$`, 'i') });
        if (board) return res.failure("Board already exists");

        const newBoard = await db.board.create({
            name,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        return res.data(newBoard);
    } catch (error) {
        return res.failure(error.message);
    }
};

export const getBoard = async (req, res) => {
    const { boardId } = req.params;
    try {
        const board = await db.board.findById(boardId);
        if (!board) return res.failure("Board not found");
        return res.data(board);
    } catch (error) {
        return res.failure(error.message);
    }
};

export const getBoards = async (req, res) => {
    try {
        const boards = await db.board.find();
        return res.page(boards);
    } catch (error) {
        return res.failure(error.message);
    }
};

export const deleteBoard = async (req, res) => {
    const { boardId } = req.params;
    try {
        const result = await db.board.findByIdAndDelete(boardId);
        if (!result) return res.failure("Board not found");
        return res.success("Board deleted successfully");
    } catch (error) {
        return res.failure(error.message);
    }
};

export const updateBoard = async (req, res) => {
    const { boardId } = req.params;
    const updates = req.body;
    updates.updatedAt = Date.now();

    try {
        const updated = await db.board.findByIdAndUpdate(boardId, updates, { new: true });
        if (!updated) return res.failure("Board not found");
        return res.data(updated);
    } catch (error) {
        return res.failure(error.message);
    }
};