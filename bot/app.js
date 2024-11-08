import {Telegraf,Markup} from 'telegraf'

const token = '7592382380:AAE2pTKMK8lOVm3M4bjn5sH5cBCaeDBgPwE'
const webAppUrl = 'https://golden-ad1c1.web.app'

const bot = new Telegraf(token)

bot.command('start',(ctx) => {
ctx.reply(
    'Начни игру!',Markup.inlineKeyboard([
        Markup.button.webApp(
            'Open app',
            `${webAppUrl}?ref = ${ctx.payload}`

        ),
    ])
)

})

bot.launch()