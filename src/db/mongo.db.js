import mongoose from 'mongoose';

export const startMongoDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL);

  console.info('db connected');
};
