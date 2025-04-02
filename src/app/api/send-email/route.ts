import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const {
    name,
    email,
    country,
    phone,
    guests,
    tripType,
    festival,
    places,
    travelMonth,
    travelStyle,
    tripLength,
    specifics,
  } = await req.json();

  // Configure Nodemailer transporter (e.g., using Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "thetechsolaceco@gmail.com", // Replace with your email address
    subject: `New Dream Journey Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Country: ${country}
      Phone: ${phone}
      Number of Guests: ${guests}
      Trip Type: ${tripType}
      Festival Interest: ${festival}
      Desired Places: ${places}
      Travel Month: ${travelMonth}
      Travel Style: ${travelStyle}
      Trip Length: ${tripLength} days
      Specifics: ${specifics}
    `,
    html: `
      <h2>New Dream Journey Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Number of Guests:</strong> ${guests}</p>
      <p><strong>Trip Type:</strong> ${tripType}</p>
      <p><strong>Festival Interest:</strong> ${festival}</p>
      <p><strong>Desired Places:</strong> ${places}</p>
      <p><strong>Travel Month:</strong> ${travelMonth}</p>
      <p><strong>Travel Style:</strong> ${travelStyle}</p>
      <p><strong>Trip Length:</strong> ${tripLength} days</p>
      <p><strong>Specifics:</strong> ${specifics}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}