import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.CartItem ||
  mongoose.model("CartItem", cartItemSchema);
