import axios from "axios";

export async function sendStk(amount: number, phone: string, publicId: string) {
  // 1. Get access token
  const consumerKey = process.env.MPESA_CONSUMER_KEY!;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  const tokenRes = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );

  if (!tokenRes.data?.access_token) {
    throw new Error("Failed to get access token from Safaricom");
  }

  const access_token = tokenRes.data.access_token;

  // 2. Generate password
  const shortCode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);

  const password = Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );

  // Construct and encode the Callback URL
  const callbackUrlWithQuery = `${process.env.MPESA_CALLBACK_URL}?unique_id=${publicId}`;

  // 3. Build STK push payload
  const stkPayload = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount || 1,
    PartyA: phone,
    PartyB: shortCode,
    PhoneNumber: phone,
    CallBackURL: callbackUrlWithQuery,
    AccountReference: "Li's Chinese Restaurant Nairobi",
    TransactionDesc: "Payment test",
  };

  // 4. Send STK push request
  const stkRes = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    stkPayload,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return stkRes.data;
}
