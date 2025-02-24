import mongoose from 'mongoose';
import TravelRequest from '../models/travelRequest.model.js';
import UserTrips from '../models/userTrips.model.js';

export const changeRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Must be "Approved" or "Rejected".' });
  }

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({ message: 'Invalid request ID format' });
  }

  try {

    const request = await TravelRequest.findOne({ _id: requestId, status: 'Pending' });

    if (!request) {
      return res.status(404).json({ message: 'Pending travel request not found or already processed' });
    }

    request.status = status;

    if (status === 'Approved') {
      request.approvedAt = new Date();
      await request.save();

      await UserTrips.findOneAndUpdate(
        { user: request.user, destination: request.destination, startDate: request.startDate },
        {
          user: request.user,
          destination: request.destination,
          startDate: request.startDate,
          endDate: request.endDate,
          status: 'Upcoming',
        },
        { upsert: true, new: true }
      );
    } else {
      request.approvedAt = null;
      await request.save();
    }

    res.json({ message: `Travel request has been ${status}`, request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const pendingRequests = async (req, res) => {
  try {

    const pendingRequests = await TravelRequest.find({ status: 'Pending' })
      .sort({ createdAt: -1 })
      .select('-createdAt -updatedAt -user -status -__v')

    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
