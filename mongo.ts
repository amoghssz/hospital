import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-booking';
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export const getDatabase = () => {
    return client.db();
};

export const closeDatabaseConnection = async () => {
    await client.close();
    console.log('MongoDB connection closed');
};