import User from '../models/user.model.js';

export const toggleAdminRights = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newRole = user.role === 'Admin' ? 'Employee' : 'Admin';
        user.role = newRole;

        await user.save();

        res.status(200).json({
            message: `User role updated to ${newRole}`,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Error updating user role', error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users.map(user => ({
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })));
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};