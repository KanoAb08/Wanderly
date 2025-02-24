import TravelRequest from '../models/travelRequest.model.js';

export const getDashboardData = async (req, res) => {
  try {

    const totalExpenseResult = await TravelRequest.aggregate([
      { $match: { status: 'Approved' } },
      { $group: { _id: null, total: { $sum: '$expense' } } },
    ]);
    const totalExpense = totalExpenseResult.length > 0 ? totalExpenseResult[0].total : 0;

    const [totalRequests, totalAcceptedRequests, totalPendingRequests] = await Promise.all([
      TravelRequest.countDocuments(),
      TravelRequest.countDocuments({ status: 'Approved' }),
      TravelRequest.countDocuments({ status: 'Pending' }),
    ]);

    res.json({
      totalExpense,
      totalRequests,
      totalAcceptedRequests,
      totalPendingRequests,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getAllTravelRequests = async (req, res) => {
  try {

    const requests = await TravelRequest.find({}, 'user userName destination startDate endDate status expenseType expense')
      .sort({ createdAt: -1 });

    if (!requests.length) {
      return res.status(404).json({ message: 'No travel requests found' });
    }

    res.json(requests);
  } catch (error) {
    console.error('Error fetching travel requests:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getExpenseReport = async (req, res) => {
  const { filterType } = req.body;

  if (!['weekly', 'monthly'].includes(filterType)) {
    return res.status(400).json({ message: 'Invalid filter type. Must be "weekly" or "monthly".' });
  }

  try {
    const now = new Date();
    let startDate;

    if (filterType === 'weekly') {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
    } else if (filterType === 'monthly') {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 1);
    }

    const expenses = await TravelRequest.find(
      {
        status: 'Approved',
        approvedAt: { $gte: startDate, $lte: now },
      },
      'destination expense expenseType userName'
    ).sort({ approvedAt: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
