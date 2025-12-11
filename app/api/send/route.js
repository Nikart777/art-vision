import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    // 1. Добавляем phone в деструктуризацию
    const { name, email, phone, message, references, calculator_details } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Сайт Art.Vision" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🔥 Заявка от: ${name}`,
      // 2. Добавляем телефон в HTML письма
      html: `
        <h1>Новая заявка с сайта</h1>
        <p><strong>Имя/Компания:</strong> ${name}</p>
        <p><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong> ${message}</p>
        <p><strong>Референсы:</strong> ${references || 'Нет'}</p>
        <hr />
        <h3>Расчет калькулятора:</h3>
        <p>${calculator_details || 'Калькулятор не использовался'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent' }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}