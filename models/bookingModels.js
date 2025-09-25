import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: String, required: true },
    date: { type: Date, required: true },
    seatNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const bookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default bookingModel;