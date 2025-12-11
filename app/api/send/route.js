import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // 1. Получаем данные из тела запроса
    const body = await request.json();
    const { name, email, message, references, calculator_details } = body;

    // 2. Настраиваем почтальона (Transporter)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true для 465 порта
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 3. Формируем письмо
    const mailOptions = {
      from: `"Сайт Art.Vision" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO, // Куда отправлять заявки
      subject: `🔥 Новая заявка от: ${name}`,
      html: `
        <h1>Новая заявка с сайта</h1>
        <p><strong>Имя/Компания:</strong> ${name}</p>
        <p><strong>Email/Telegram:</strong> ${email}</p>
        <p><strong>Сообщение:</strong> ${message}</p>
        <p><strong>Референсы:</strong> ${references || 'Нет'}</p>
        <hr />
        <h3>Расчет калькулятора:</h3>
        <p>${calculator_details || 'Калькулятор не использовался'}</p>
      `,
    };

    // 4. Отправляем
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Ошибка отправки:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}