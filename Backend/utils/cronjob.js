import cron from 'node-cron';
import UserTrips from '../models/userTrips.model.js';

cron.schedule('0 0 * * *', async () => {
  console.log('🔄 Running cron job to update trip status...');
  const now = new Date();

  try {

    const { modifiedCount } = await UserTrips.updateMany(
      { status: 'Upcoming', endDate: { $lt: now } },
      { $set: { status: 'Completed' } }
    );

    if (modifiedCount > 0) {
      console.log(`✅ Successfully updated ${modifiedCount} trips to Completed.`);
    } else {
      console.log('⚠️ No upcoming trips found that need updating.');
    }
  } catch (error) {
    console.error('❌ Error updating trips:', error.message);
  }
});
