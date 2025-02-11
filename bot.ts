// utils/telegram.js
export async function sendTelegramMessage(message) {
    const token = "7333511809:AAGaiCkuWxXTqnmxmdHKYGjGm6m00IzYcqo";  // Store this in .env.local
    const chatId = process.env.TELEGRAM_CHAT_ID;  // Chat ID or Group ID
    
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const body = {
        chat_id: 7849552234,
        text: message,
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error('Failed to send message via Telegram');
    }

    return await res.json();
}
