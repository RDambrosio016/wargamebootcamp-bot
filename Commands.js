const Discord = require('discord.js');
const help = ('**!duckinfo** - Displays info about the bot, code, and Acknowledgements \n **!gitlist <unit>** - Displays the full stats of any units with the matching name \n **!git <unit>** - Displays a message where you can scroll through the units using reactions \n **!gitpm <unit>** - Same as git but sends the results through pm \n **!gitspec <unit>** - Same as git but requires a specific unit name \n **!list <unit>** - Lists all matching units \n **!ke <armor value>** - Displays a table of ke damage values for that armor value \n **!heat <armor value>** - Displays a table of HEAT damage for that armor value \n **!aptable <0 - 30 ap value>** - Displays the damage to armor values of both ke and heat \n **!<map>** - Displays a map of a ranked map \n**!wiki / !wikipedia <search term>** - searches and returns a description of a wikipedia article - ***please make sure you wait for the reactions to complete before clicking on one, or it wont work** \n  **!vet** - Shows Vlern\'s table of accuracy with upvetting \n **!rookie** - Gives you the rookie role \n **!lfg** - Adds you to the looking for game pool \n **!unspecguide** - A beginner deck building guide \n **!specprimer** - A primer to spec decks and how to counter them \n **!honguide** - A beginner\'s guide to wargame \n **!razzguide** - Razzmann\'s video wargame guides \n **!keyvalues** - Values worth remembering  \n **!armorytool** - A tool for viewing hidden unit stats \n **!replayfolder** - Folder Where game replays are stored \n **!rof** - A Rate of Fire cheatsheet \n **!bling** - How to get colors and tags in wargame \n **!progression** - Reccomended progression guide for beginners\n **!rankedmaps** - List of maps in the ranked pool \n\n **Changelog**: https://docs.google.com/document/d/1WAlUqnyoh8ZZCVZwXd95em5sXpuMG4iSiE2ODPG7iSE/edit?usp=sharing \n\n **For any bugs or questions, pm senorDickweed#7033**');
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

  const wtf = require('wtf_wikipedia');
  const fs = require('fs');
  const search = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
  const fetch = require('node-fetch');
  const w = require('./Formatting.js');

  module.exports.wikipedia = (message, args) => {
      var allArgs = '';
      for (let i = 0; i < args.length; i++) {
        allArgs += args[i].toLowerCase() + ' ';
      }
      allArgs = allArgs.trim();
      allArgs = allArgs.replace(/[\s+]/g, '_');
      const searchurl = search + allArgs;

        fetch(searchurl)
      .then(res => res.json())
      .then((data) => {
        if (data[1].length === 0) {
             let embed = new Discord.RichEmbed()
                 .setAuthor('No results', 'https://imgur.com/ab2t4Kh.png')
                 .setTitle('Error: There are no search results for ' + allArgs.replace(/[\_]/g, ' ') + ' :( . Try something else!')
                 .setColor('WHITE');
              message.channel.send(embed);
             return;
         }
         let index = 0;
         let listNumbers = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];
          let usedListNumbers = [];
          let articleListText = "";
          if(data[1].length == 1) {index = 0; w.wformatting(index, data, message); return; }
          if(data[1].length === 10) data[1].length = data[1].length - 1;

          for (let i = 0; i < 20; i++) {
            if(i === data[1].length) break;
              articleListText += listNumbers[i] + "  " + data[1][i];
              articleListText += "\n";
          }
          let embed = new Discord.RichEmbed()
              .setAuthor('Results', 'https://imgur.com/ab2t4Kh.png')
              .addField('Here are the search results for:' + allArgs, articleListText + "\n")
              .setFooter("Use the reactions to select an article to get the description and link.")
              .setColor('WHITE');
              const pagesFilter = (reaction, user) => user.id == message.author.id;
          message.channel.send(embed)
          .then(async msg => {
              for (const reaction of listNumbers) {
                if(index === data[1].length) break;
                await msg.react(reaction);
                index++;
              }


            const pages =  new Discord.ReactionCollector(msg, pagesFilter, {
              time: 60000,
            });

            pages.on('collect', r => {
              if(r.emoji.name === listNumbers[-1]) {index = -1; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[0]) {index = 0; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[1]) {index = 1; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[2]) {index = 2; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[3]) {index = 3; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[4]) {index = 4; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[5]) {index = 5; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[6]) {index = 6; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[7]) {index = 7; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[8]) {index = 8; w.wformatting(index, data, message); msg.delete(); return;}
            });
            pages.on('end', (collected, reason) => {
              if(reason == 'time') {
                msg.delete().catch(err => {
                });
              }
            });
          });
        });
  };
