import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_TO = 'project@24art-vision.ru';

/**
 * Транспорт для отправки заявок.
 *
 * На VPS нет локального sendmail, поэтому письма уходят через SMTP
 * (реквизиты в переменных окружения SMTP_*). Если SMTP_HOST не задан —
 * запасной вариант через /usr/sbin/sendmail, как было на старом хостинге.
 */
function createTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) {
    return nodemailer.createTransport({ sendmail: true, newline: 'unix', path: '/usr/sbin/sendmail' });
  }
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact, projectType, budget, message } = body;

    if (!name || !contact) {
      return NextResponse.json({ error: 'Укажите имя и контакт' }, { status: 400 });
    }

    const text = `🔥 Новая заявка с сайта Art.Vision!

Имя: ${name}
Контакт: ${contact}
Тип проекта: ${projectType || 'Не указан'}
Бюджет: ${budget || 'Не указан'}

Сообщение:
${message || 'Нет сообщения'}`;

    const to = process.env.EMAIL_TO || DEFAULT_TO;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || to;

    await createTransport().sendMail({
      from,
      to,
      replyTo: /\S+@\S+\.\S+/.test(String(contact)) ? contact : undefined,
      subject: `Новая заявка с сайта от ${name}`,
      text,
    });

    return NextResponse.json({ message: 'Sent successfully' }, { status: 200 });
  } catch (error) {
    // Детали ошибки — только в лог сервера, наружу не отдаём стек и реквизиты.
    console.error('Error in /api/send:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
