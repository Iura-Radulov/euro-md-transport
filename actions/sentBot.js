"use server";



export async function sentTransportForm(values){

    const { fromDestination, phone, toDestination } = values;

    const TelegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const TelegramChayId = process.env.TELEGRAM_CHAT_ID;

    const message = `🚚 <b>Новый заказ (EuroMd)</b>\n
    📍 <b>Откуда:</b> <code>${fromDestination}</code>\n
    🏁 <b>Куда:</b> <code>${toDestination}</code>\n
    📞 <b>Телефон:</b> <code>${phone}</code>\n`

    const sendData = {
        chat_id: TelegramChayId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
    }

        const response = await fetch(`https://api.telegram.org/bot${TelegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        });


        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        return await response.json();

    }

export async function sentContactForm(values){

    const { name, phone, message } = values;

    const TelegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const TelegramChayId = process.env.TELEGRAM_CHAT_ID;

    const text = `📩 <b>Контактная форма</b>\n
    👤<b>Имя:</b> <code>${name}</code>\n
    📞 <b>Телефон:</b> <code>${phone}</code>\n
     💬 <b>Сообщение:</b>\n<i>${message}</i>`

    const sendData = {
        chat_id: TelegramChayId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
    }

    const response = await fetch(`https://api.telegram.org/bot${TelegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
    });


    if (!response.ok) {
        throw new Error('Failed to send data');
    }

    return await response.json();

}