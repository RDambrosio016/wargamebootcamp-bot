const Discord = require('discord.js');
const help = ('**!duckinfo** - Displays info about the bot, code, and Acknowledgements \n **!gitlist <unit>** - Displays the full stats of any units with the matching name \n **!git <unit>** - Displays a message where you can scroll through the units using reactions \n **!gitpm <unit>** - Same as git but sends the results through pm \n **!gitspec <unit>** - Same as git but requires a specific unit name \n **!list <unit>** - Lists all matching units \n **!ke <armor value>** - Displays a table of ke damage values for that armor value \n **!heat <armor value>** - Displays a table of HEAT damage for that armor value \n **!<map>** - Displays a map of a ranked map \n **!rookie** - Gives you the rookie role \n **!lfg** - Adds you to the looking for game pool \n **!unspecguide** - A beginner deck building guide \n **!specprimer** - A primer to spec decks and how to counter them \n **!honguide** - A beginner\'s guide to wargame \n **!razzguide** - Razzmann\'s video wargame guides \n **!keyvalues** - Values worth remembering  \n **!armorytool** - A tool for viewing hidden unit stats \n **!replayfolder** - Folder Where game replays are stored \n **!rof** - A Rate of Fire cheatsheet \n **!bling** - How to get colors and tags in wargame \n **!progression** - Reccomended progression guide for beginners\n **!rankedmaps** - List of maps in the ranked pool \n\n **Changelog**: https://docs.google.com/document/d/1WAlUqnyoh8ZZCVZwXd95em5sXpuMG4iSiE2ODPG7iSE/edit?usp=sharing \n\n **For any bugs or questions, pm senorDickweed#7033**');
const adminhelp = ('List of admin commands: \n**!invite <duration in minutes> <uses>** - Creates an invite link, set duration to zero to make it infinite duration \n **!changelimit <number>** - Changes the limit of matching units to display fully \n **!changedisplaylimit <number>** - Changes the limit of units to be shown in a name list \n **!dynocommands** - Turns on / off the dyno commands (!unspec !rookie, etc)');
module.exports.help = (args, message) => {
  const filter = (reaction, user, member) => {
    return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  message.reply(help).then(m => {
    m.react('🗑');
    m.awaitReactions(filter, {
        max: 1,
        time: 5000,
        errors: ['Time'],
      })
      .then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === '🗑') {
          m.delete().then(() => {
            message.delete(message);
          });
        }
      }).catch(err => {
        m.clearReactions();
      });
  });
};

module.exports.adminhelp = (args, message) => {
  const filter = (reaction, user, member) => {
    return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  message.reply(adminhelp).then(m => {
    m.react('🗑');
    m.awaitReactions(filter, {
        max: 1,
        time: 5000,
        errors: ['Time'],
      })
      .then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === '🗑') {
          m.delete().then(() => {
            message.delete(message);
          });
        }
      }).catch(err => {
        m.clearReactions();
      });
  });
};


module.exports.invite = (message, admin, args) => {
  const duration = args[0] * 60;
  const uses = args[1];
  if(!admin) {
    message.reply('Must be an admin to use this command');
    return;
  }
  if(isNaN(duration) || isNaN(uses)) {
    message.reply('Please use a number for the inputs');
    return;
  }

  message.channel.createInvite({
    maxAge: Number(duration),
    maxUses: Number(uses),
  }).then(m => {
    message.channel.send('created invite: ' + m);
  }).catch(err => {
    console.log(err);
  });


};

module.exports.botcommands = (client, admin) => {

  if(admin) {
  client.channels.get("506955344996597771").bulkDelete(2);
  client.channels.get("506955344996597771").send(help);
  } else {
    return;
  };
  };
  //
  // module.exports.reconvalues = () => {
  //
  //   const recon = new Discord.RichEmbed()
  //   .setTitle('**Recon Values**')
  //   .setDescription('Common values for recon');
  //   .addField('Forests', '')
  // };
