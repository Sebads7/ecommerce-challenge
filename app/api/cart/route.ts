import { NextResponse } from "next/server";
import connectToDatabase from "../../lib/mongogb";
import Cart from "../../models/CartItem";

// Named export for POST request
export async function POST(req: Request) {
  try {
    await connectToDatabase(); // Connect to MongoDB
    const body = await req.json(); // Parse the request body
    const { title, price, count } = body;

    let existingItem = await Cart.findOne({ title });

    if (existingItem) {
      existingItem.count += count;
      existingItem.price += price;
      await existingItem.save();
      return NextResponse.json(
        { success: true, data: existingItem },
        { status: 200 }
      );
    } else {
      // Create a new cart item
      const cart = await Cart.create(body);
      return NextResponse.json({ success: true, data: cart }, { status: 201 });
    }
  } catch (err) {
    console.error("Error creating cart item:", err);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

// Named export for GET request
export async function GET() {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch all cart items
    const cart = await Cart.find({});
    return NextResponse.json({ success: true, data: cart }, { status: 200 });
  } catch (err) {
    console.error("Error fetching cart items:", err);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

// Named export for PUT request
export async function PUT(req: Request) {
  try {
    await connectToDatabase(); // Connect to MongoDB
    const body = await req.json(); // Parse the request body
    const id = req.url?.split("/").pop() || ""; // Extract ID from URL

    // Update the cart item by ID
    const cart = await Cart.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!cart) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: cart }, { status: 200 });
  } catch (err) {
    console.error("Error updating cart item:", err);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
