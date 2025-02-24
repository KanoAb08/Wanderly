import mongoose from 'mongoose';

const userTripsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Completed'],
      default: 'Upcoming',
      index: true,
    }
  },
  { timestamps: true }
);

userTripsSchema.index({ user: 1 });

const UserTrips = mongoose.model('UserTrips', userTripsSchema);
export default UserTrips;
