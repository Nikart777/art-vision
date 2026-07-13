import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact, projectType, budget, message } = body;

    // Hardcoded credentials for Telegram from user request
    const botToken = "8897950752:AAED7hKCBHjt2vsghqXGkP0kY9JNOJroi20";
    const chatId = "395454973";

    const text = `🔥 Новая заявка с сайта Art.Vision!
    
👤 <b>Имя:</b> ${name}
📞 <b>Контакт:</b> ${contact}
💼 <b>Тип проекта:</b> ${projectType || 'Не указан'}
💰 <b>Бюджет:</b> ${budget || 'Не указан'}

💬 <b>Сообщение:</b>
${message || 'Нет сообщения'}`;

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // We use the Tinyproxy running on the VPN server to bypass any blocking in RF
    // This connects via the VPN proxy, guaranteeing connection to Telegram
    const proxyAgent = new HttpsProxyAgent('http://cyberx:2751872bd5db148f22c3126f@72.56.108.26:8888');
    
    const tgResponse = await fetch(tgUrl, {
      method: 'POST',
      agent: proxyAgent,
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