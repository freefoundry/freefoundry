import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // 👈 REQUIRED for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendSubscriptionEmail(email: string) {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "You're subscribed to FreeFoundry!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to FreeFoundry</h2>
        <p>Thanks for subscribing to our newsletter.</p>
        <p>You’ll now receive updates about:</p>
        <ul>
          <li>Free learning resources</li>
          <li>Scholarships & opportunities</li>
          <li>Career tools</li>
        </ul>
        <p>We’re excited to have you with us!</p>
        <p><strong>– FreeFoundry Team</strong></p>
      </div>
    `,
  });
}
