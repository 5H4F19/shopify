import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex:true
        })
        console.log(`MongoDB Connected`.bgGreen)
    } catch (e) {
        console.log(e.red)
        process.exit(1)
    }
}

export default connectDB