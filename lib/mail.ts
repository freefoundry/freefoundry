import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true, //   REQUIRED for 465
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


/* ===============================
   Contact Form Email (NEW)
================================ */
export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  // Email to Admin
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.CONTACT_EMAIL || process.env.FROM_EMAIL,
    subject: `New Contact Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      </div>
    `,
  });

  // Optional: Auto-reply to user
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "We received your message – FreeFoundry",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out to <strong>FreeFoundry</strong>.</p>
        <p>We’ve received your message and will get back to you shortly.</p>
        <p>If your message is urgent, please reply directly to this email.</p>
        <br />
        <p><strong>– FreeFoundry Team</strong></p>
      </div>
    `,
  });
}