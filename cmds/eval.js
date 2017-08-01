exports.data = {
  name: 'Eval Command',
  command: 'eval',
  description: 'Sends an eval',
  group: 'system',
  syntax: 'wt eval [script]',
  author: 'Matt C: matt@artemisbot.uk',
  permissions: 4
}

const log = require('../lib/log.js')(exports.data.name)

exports.func = async (msg, args, bot) => {
  log.info(`${msg.member.displayName} (${msg.author.username}#${msg.author.discriminator}) has used eval in #${msg.channel.name} on ${msg.guild.name}.`)
  var code = args.join(' ')
  try {
    var evaled = eval(code) // eslint-disable-line no-eval
    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
    await msg.channel.send('```xl\n' + clean(evaled) + '\n```').catch(e => log.error(e))
  } catch (err) {
    await msg.channel.send('`ERROR` ```xl\n' + clean(err) + '\n```').catch(e => log.error(e))
  }
}

function clean (text) {
  if (typeof text === 'string') {
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
  } else {
    return text
  }
}
