import mongoose from 'mongoose';

const connectDb = async () => {

    try {
        await mongoose.connect(process.env.NEXT_APP_SERVER_URL || '');
        console.log('Connected');
    } catch (error) {
        console.log(error, 'error');
    }
    
};
export default connectDb;
