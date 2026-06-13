'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import nodemailer from 'nodemailer';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SubmissionSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  intereses: z.string().min(1, "Vibe selection is required"),
  notas: z.string().optional(),
});

export type SubmissionState = {
  errors?: {
    date?: string[];
    time?: string[];
    intereses?: string[];
    notas?: string[];
  };
  message?: string | null;
};

async function sendNotificationEmail(data: {
  date: string;
  time: string;
  vibe: string;
  notes: string;
}) {
    console.log('sending email');
    
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: '💕 New date submission!',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #ec4899;">New submission received! 🎉</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #6b7280;">Date</td>
            <td style="padding: 8px; color: #1f2937;">${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #6b7280;">Time</td>
            <td style="padding: 8px; color: #1f2937;">${data.time}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #6b7280;">Vibe</td>
            <td style="padding: 8px; color: #1f2937;">${data.vibe}</td>
          </tr>
          ${data.notes ? `<tr>
            <td style="padding: 8px; font-weight: bold; color: #6b7280;">Notes</td>
            <td style="padding: 8px; color: #1f2937;">${data.notes}</td>
          </tr>` : ''}
        </table>
      </div>
    `,
  });

  console.log('%%%%%%%%%%end send email%%%%%%%%')
}

export async function createSubmission(data: {
  date: string;
  time: string;
  intereses: string[];
  notas: string;
}) {
    debugger
  const validatedFields = SubmissionSchema.safeParse({
    date: data.date,
    time: data.time,
    intereses: data.intereses.join(', '),
    notas: data.notas,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Missing Fields. Please complete all required fields.',
    };
  }

  const { date, time, intereses, notas } = validatedFields.data;

  debugger
  try {
    await sql`
      INSERT INTO submissions (date, time, vibe, notes, created_at)
      VALUES (${date}, ${time}, ${intereses}, ${notas || ''}, NOW())
    `;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Database Error: Failed to save submission.',
    };
  }

  try {
    await sendNotificationEmail({ date, time, vibe: intereses, notes: notas || '' });
  } catch (error) {
    console.error('Email send failed:', error);
    // Don't block the redirect if email fails — data is already saved
  }

  redirect('/success');
}

