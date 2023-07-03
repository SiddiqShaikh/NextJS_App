import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('MongoDB is Already connected');
		return;
	} else {
		try {
			await mongoose.connect(process.env.MONGODB_URI, {
				dbName: 'prompt-app',
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			isConnected = true;
			console.log('MongoDB connected');
		} catch (err) {
			console.log(err);
		}
	}
};
