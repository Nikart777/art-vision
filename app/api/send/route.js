import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact, projectType, budget, message } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены в .env");
      return NextResponse.json({ error: 'Telegram credentials missing' }, { status: 500 });
    }

    const text = `🔥 Новая заявка с сайта Art.Vision!
    
👤 <b>Имя:</b> ${name}
📞 <b>Контакт:</b> ${contact}
💼 <b>Тип проекта:</b> ${projectType || 'Не указан'}
💰 <b>Бюджет:</b> ${budget || 'Не указан'}

💬 <b>Сообщение:</b>
${message || 'Нет сообщения'}`;

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // В локальной разработке обращаемся напрямую (прокси на VPN блокирует домашние IP)
    // На сервере тоже сработает, если Роскомнадзор не блочит api.telegram.org на этом хостинге
    const tgResponse = await fetch(tgUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      }),
    });

    if (!tgResponse.ok) {
      const errorData = await tgResponse.text();
      console.error("Telegram Error:", errorData);
      throw new Error('Telegram API error');
    }

    return NextResponse.json({ message: 'Sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/send:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}