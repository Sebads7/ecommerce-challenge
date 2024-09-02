// app/api/cart/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongogb";
import Cart from "../../../models/CartItem";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDatabase();
    const result = await Cart.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting item" },
      { status: 500 }
    );
  }
}
