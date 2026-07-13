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

    // На виртуальном хостинге локальный SMTP часто закрыт или требует хитрой авторизации.
    // Используем sendmail напрямую через ядро Linux — это работает безотказно.
    const transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail'
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