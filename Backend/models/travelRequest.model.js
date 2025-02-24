import mongoose from 'mongoose';

const travelRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function (value) {

          return value > this.startDate;
        },
        message: 'End date must be after the start date',
      },
    },
    expenseType: {
      type: String,
      enum: {
        values: ['Hotel', 'Flight', 'Both'],
        message: 'Expense type must be Hotel, Flight, or Both',
      },
      required: [true, 'Expense type is required'],
    },
    expense: {
      type: Number,
      required: [true, 'Expense is required'],
      min: [0, 'Expense must be a positive number'],
    },
    purpose: {
      type: String,
      required: [true, 'Purpose is required'],
      maxlength: [500, 'Purpose cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Approved', 'Rejected'],
        message: 'Status must be Pending, Approved, or Rejected',
      },
      default: 'Pending',
    },
    approvedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

travelRequestSchema.index({ user: 1 });
travelRequestSchema.index({ status: 1 });

const TravelRequest = mongoose.model('TravelRequest', travelRequestSchema);
export default TravelRequest;