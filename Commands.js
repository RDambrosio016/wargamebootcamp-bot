const Discord = require('discord.js');
const help = ('**!duckinfo** - Displays info about the bot, code, and Acknowledgements \n **!gitlist <unit>** - Displays the full stats of any units with the matching name \n **!git <unit>** - Displays a message where you can scroll through the units using reactions \n **!gitpm <unit>** - Same as git but sends the results through pm \n **!gitspec <unit>** - Same as git but requires a specific unit name \n **!list <unit>** - Lists all matching units \n **!replay** <replay attachment> - Gives a lot of data about the replay file, like players, deckcodes, etc, (only 1v1\'s are supported) \n **!ke <ke value>** - Displays a table of armor damage values for that ke value \n **!heat <heat value>** - Displays a table of armor damage for that heat value \n **!armor <0 - 25 armor>** - Displays the damage resistance of an armor value towards ke and heat \n **!<map>** - Displays a map of a ranked map \n  **!vet** - Shows Vlern\'s table of accuracy with upvetting \n **!userinvite** - Makes a 2 hour, 1 use invite for you to invite someone \n **!rookie** - Gives you the rookie role \n **!lfg** - Adds you to the looking for game pool \n **!unspecguide** - A beginner deck building guide \n **!specprimer** - A primer to spec decks and how to counter them \n **!honguide** - A beginner\'s guide to wargame \n **!razzguide** - Razzmann\'s video wargame guides \n **!keyvalues** - Values worth remembering  \n **!armorytool** - A tool for viewing hidden unit stats \n **!replayfolder** - Folder Where game replays are stored \n **!rof** - A Rate of Fire cheatsheet \n **!bling** - How to get colors and tags in wargame \n **!progression** - Reccomended progression guide for beginners\n **!rankedmaps** - List of maps in the ranked pool \n\n **Changelog**: https://docs.google.com/document/d/1WAlUqnyoh8ZZCVZwXd95em5sXpuMG4iSiE2ODPG7iSE/edit?usp=sharing \n\n **For any bugs or questions, pm senorDickweed#7033**');
const adminhelp = ('List of admin commands: \n**!invite <duration in minutes> <uses>** - Creates an invite link, set duration to zero to make it infinite duration \n **!changelimit <number>** - Changes the limit of matching units to display fully \n **!changedisplaylimit <number>** - Changes the limit of units to be shown in a name list \n **!dynocommands** - Turns on / off the dyno commands (!unspec !rookie, etc)');
const mongoose = require('mongoose');
const MSGES = require('./Mongoose/messageSchema.js');
const deck = require('./Data/Deck.js');



module.exports.userinvite = (message) => {
  message.channel.createInvite({
    maxAge: Number((2 * 60) * 60),
    maxUses: Number(1),
  }).then(m => {
    message.reply('created invite: ' + m);
  }).catch(err => {
    console.log(err);
  });
};

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
      let searchurl = search + allArgs;
      searchurl = searchurl.replace(/[\s+]/g, '_');
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

  module.exports.replay = (args, message) => {
    if(message.attachments.first().url == undefined) {
      message.channel.send('please attach a wargame replay file')
      return;
  }
  const url = (message.attachments.first().url);
  const fileType = require('file-type');

  fetch(url)
      .then(res => res.buffer())
      .then(buffer => {
          fileType(buffer)
          content = buffer;
          const jsonsize = content.readInt16BE(0x32);  
          let json =  content.slice( 0x38, 0x38 + jsonsize).toString();
          json = JSON.parse(json);
          const user1 = Object.values(json)[1];
          json.game.Map = json.game.Map.replace(/\_/g, ' ');
          

          const income = {
              "1":"Very Low -40%",
              "2":"Low - 20%",
              "3":"Normal -0%",
              "4":"High +20%",
              "5":"Very High +40%"
          }
          
          const map = {
              "Conquete 2x3 Gangjin":"Mud Fight",
              "Conquete 2x3 Hwaseong":"Nuclear Winter",
              "Conquete 3x3 Muju":"Plunjing Valley",
              "Conquete 2x3 Tohoku Alt":"Paddy Field",
              "Conquete 3x3 Muju Alt":"Punchbowl",
              "Conquete 3x3 Marine 3 Reduite Terrestre":"Hell in a very small place",
              "Conquete 3x3 Highway Small":"Highway to Seoul"
          }
          if(map.hasOwnProperty(json.game.Map))
              json.game.Map = map[json.game.Map];

          if (income.hasOwnProperty(json.game.IncomeRate))
              json.game.IncomeRate = income[json.game.IncomeRate];

          
          
          if(Object.values(json)[3] !== undefined) {
              message.reply('Only 1v1\'s are supported at this moment')
              return;
          }

          let embed = new Discord.RichEmbed()
              .setTitle(json.game.ServerName)
              .setDescription(
               '\n **Map**: ' + json.game.Map + 
               '\n **Starting Points**: ' + json.game.InitMoney +
               '\n **Winning Points**: ' + json.game.ScoreLimit +
               '\n **Game Duration**: ' + (json.game.TimeLimit / 60 + 'm') +
               '\n **Income Rate**: ' + json.game.IncomeRate)
              .setColor('ORANGE')
              .addField(user1.PlayerName, ' **Level**: ' + user1.PlayerLevel + 
              '\n **Elo / Rank**: ' + user1.PlayerElo + ' | ' + user1.PlayerRank +
              '\n **Deck**: ' + deck.decode(user1.PlayerDeckContent) + 
              '\n **Deck Code**: ' + user1.PlayerDeckContent + 
              '\n **Deck Name**: ' + user1.PlayerDeckName +
              '\n **Team**: ' + (user1.PlayerAlliance - - 1), true);
              if(Object.values(json)[2] !== undefined) {
                  let user2 = Object.values(json)[2];
                  embed.addField(user2.PlayerName, ' **Level**: ' + user2.PlayerLevel + 
                      '\n **Elo / Rank**: ' + Math.round(user2.PlayerElo) + ' | ' + user2.PlayerRank +
                      '\n **Deck**: ' + deck.decode(user2.PlayerDeckContent) + 
                      '\n **Deck Code**: ' + user2.PlayerDeckContent + 
                      '\n **Deck Name**: ' + user2.PlayerDeckName +
                      '\n **Team**: ' + (user2.PlayerAlliance - - 1), true);
              }
              message.channel.send(embed);
              
         
      })
      .then(type => { /* ... */ });
  }


