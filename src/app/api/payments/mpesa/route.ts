import { NextResponse } from "next/server";
import { sendStk } from "@/lib/payments/mpesa";
import { supabase } from "@/lib/supabase/server";
import { createOrder, getTotalPrice, Item } from "@/utils/cart/payments";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  //Fetching the amount from the database because you can't trust what comes from the client
  const { total } = await getTotalPrice(body.items as Item[]);

  //This is to check if this is the first time the customer is transacting or it is a retry
  const orderIdFromClient = body.payload?.orderId || null;

  let orderId = orderIdFromClient;

  //Checking if the orderId exist so as to know if to insert the record to the database
  if (!orderId) {
    //Extracting the payload to then insert it to the orders table
    const payload = {
      ...body.payload,
      total,
    };
    const { data } = await createOrder(payload);

    //checking if there was a problem while creating the order
    if (!data || !data.id) {
      console.error("Failed to create order");
      return NextResponse.json(
        { error: "Order creation failed" },
        { status: 500 }
      );
    }
    orderId = data.id;
  }

  //Getting the phone number so that later on I can send the STK push
  const { phoneNumber } = body;

  if (!phoneNumber) {
    return NextResponse.json({ error: "Missing phoneNumber" }, { status: 400 });
  }
  //Generating a random id to uniquely identify the payments
  const uniqueId = randomUUID();

  // Sending the stk push to the client
  const stkData = await sendStk(total, phoneNumber, uniqueId);
  const checkoutRequestId = stkData.CheckoutRequestID;

  //validating if the checkoutRequestID was generated:
  if (!checkoutRequestId) {
    const errorMsg =
      stkData.errorMessage ||
      stkData.ResponseDescription ||
      "M-Pesa did not accept the transaction request.";
    console.log(errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
  //Getting the user id from the env file
  const userId = process.env.USER_ID;
  // Record payment in Supabase
  const { error: insertError } = await supabase.from("payments").insert([
    {
      id: uniqueId,
      checkout_request_id: checkoutRequestId,
      phone: phoneNumber,
      amount: total, // ✅ use consistent column name
      user_id: userId,
      order_id: orderId,
      status: "pending",
    },
  ]);

  //Validating if the payment record was fully inserted
  if (insertError) {
    console.error("DB insert error:", insertError);
    return NextResponse.json(
      { error: "Failed to save payment" },
      { status: 500 }
    );
  }

  // returning the unique_id to uniquely identify each record in the payments table and order_id to know which record in the order table they are referencing to
  return NextResponse.json(
    { unique_id: uniqueId, order_id: orderId },
    { status: 200 }
  );
}
