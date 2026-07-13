import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact, projectType, budget, message } = body;

    const text = `🔥 Новая заявка с сайта Art.Vision!
    
Имя: ${name}
Контакт: ${contact}
Тип проекта: ${projectType || 'Не указан'}
Бюджет: ${budget || 'Не указан'}

Сообщение:
${message || 'Нет сообщения'}`;

    // Настраиваем почтовый транспорт
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: process.env.SMTP_PORT || 25,
      secure: process.env.SMTP_SECURE === 'true', 
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      } : undefined,
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || 'project@art-vision.online',
      to: 'project@art-vision.online',
      subject: `Новая заявка с сайта от ${name}`,
      text: text,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/send:', error);
    return NextResponse.json({ error: 'Failed to send', details: error.message, stack: String(error.stack) }, { status: 500 });
  }
}