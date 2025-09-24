import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  clerkId: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  imgUrl: { type: String, },
},{ timestamps: true });
export default mongoose.models.User || mongoose.model("User", UserSchema);