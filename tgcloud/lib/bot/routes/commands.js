import { Bot } from '../../cloudgram/bot.js';

import help from '../commands/help.js';

bot.command('help', help);


// Unknown commands are ignored by default
// Uncomment this if you want assign ur own
// handler for unknown commands:

// bot.onUnknownCommand(async (ctx) => {
//     await ctx.reply('Unknown command');
// });
