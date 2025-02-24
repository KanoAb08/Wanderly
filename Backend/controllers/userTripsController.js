import UserTrips from '../models/userTrips.model.js';

export const getUserTrips = async (req, res) => {
  const { userId } = req.params;

  try {
    const upcomingTrips = await UserTrips.find({ user: userId, status: 'Upcoming' })
      .select('-createdAt -updatedAt -user -__v -_id')
      .sort({ startDate: 1 })
      .limit(3);

    const completedTrips = await UserTrips.find({ user: userId, status: 'Completed' })
      .select('-createdAt -updatedAt -user -__v -_id')
      .sort({ endDate: -1 })
      .limit(3);

    res.json({ upcomingTrips, completedTrips });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
