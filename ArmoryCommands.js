const Discord = require('discord.js');
const units = require('./UnitData.json');
const format = require('./Formatting.js');

module.exports.git = (args, message, limit, displaylimit) => {

  var allArgs = '';
  for (let i = 0; i < args.length; i++) { //adds up all arguements after !git or !get into one single string named allArgs
    allArgs += args[i].toLowerCase() + ' ';
  }

  allArgs = allArgs.trim(); //strip any leading or trailing spaces

  if (allArgs === '') {
    message.reply('Command requires a parameter'); //if the user does !git <space> or !git, return and reply this.
    return;
  }

  const matchingUnits = units.filter((i, index) => { //make matchingUnits into a filter of units

    s1 = allArgs.replace(/[\s'-]*/g, '').toLowerCase();
    s2 = i.Name.replace(/[\s'-]*/g, '').toLowerCase();

    if (s2.match(s1)) { // check if unit includes allArgs
      return i;
    }
  });

  if (matchingUnits.length === 0) {
    message.reply('No units matched with the name ' + allArgs);
  }

  if (matchingUnits.length > limit) {
    message.reply(allArgs.toUpperCase() + ' is included in ' + matchingUnits.length + ' units, please be more specific or use !gitspec (or !getspec) ');
    if (matchingUnits.length < 30) {
      i = matchingUnits[0];
      if (matchingUnits.length < 50) {
        const send = format.formatting(i);
        message.channel.send(send);

      }
      const matching = [];
      matchingUnits.forEach((i) => {
        matching.push('**' + i.Name + '** | ');
      });
      message.channel.send('first unit sent, these are the other variations: ' + matching.join(''));
      return;

    } else if (matchingUnits.length > displaylimit) {
      message.reply('Too many matching units to display list');
      return;


    }

  }


  for (i of matchingUnits) {


    const send = format.formatting(i);
    const filter = (reaction, user, member) => { //make a filter of only the reaction wastebasket made by the user
      return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.channel.send(send).then(m => {
      m.react('🗑'); //react with a wastebasket to the bots own post
      m.awaitReactions(filter, {
          max: 1,
          time: 15000,
          errors: ['Time'],
        }) //wait 15 seconds for reactions and throw an error if none are found after 15seconds
        .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.name === '🗑') { //if the reaction is wastebasket, delete the bot's message, and if the unit matching length is less than 2, delete the user's message
            m.delete().then(() => {
              
                message.delete(message).catch(err);

            });
          }
        }).catch(err => { //if there are no reactions after 15 seconds that match the filter, throw an error, on that error, clear all reactions
          m.clearReactions();
        });
    });

  };
};







module.exports.gitpm = (args, message) => {

  var allArgs = '';
  for (let i = 0; i < args.length; i++) { //adds up all arguements after !git or !get into one single string named allArgs
    allArgs += args[i].toLowerCase() + ' ';
  }

  allArgs = allArgs.trim(); //strip any leading or trailing spaces

  if (allArgs === '') {
    message.reply('Command requires a parameter'); //if the user does !git <space> or !git, return and reply this.
    return;
  }

  const matchingUnits3 = units.filter((i, index) => { //make matchingUnits into a filter of units

    s1 = allArgs.replace(/[\s'-]*/g, '').toLowerCase();
    s2 = i.Name.replace(/[\s'-]*/g, '').toLowerCase();

    if (s2.match(s1)) { // check if unit includes allArgs
      return i;
    }
  });

  if (matchingUnits3.length === 0) {
    message.reply('No units matched with the name ' + allArgs);
  }


  if (matchingUnits3.length > 10) {
    message.author.send('Too many units match with ' + allArgs + ' to display');
    message.delete();
    if (matchingUnits3 < 25) {
      const matching = [];
      matchingUnits3.forEach((i) => {
        matching.push('**' + i.Name + '** | ');
      });
      message.author.send('Matching untis: ' + matching);
      return;
    } else if (matchingUnits3 > 25) {
      return;
    }
    return;
  }


  message.reply('Pm sent!').then(m => m.delete(3000));
  matchingUnits3.forEach((i) => {

    const send = format.formatting(i);
    message.author.send(send);

  });
  message.delete();
};





module.exports.gitspec = (args, message, limit, displaylimit) => {

  var allArgs = '';
  for (let i = 0; i < args.length; i++) { //adds up all arguements after !git or !get into one single string named allArgs
    allArgs += args[i].toLowerCase() + ' ';
  }

  allArgs = allArgs.replace(/^\s+|\s+$/g, ''); //strip any leading or trailing spaces

  if (allArgs === '') {
    message.reply('Command requires a parameter'); //if the user does !git <space> or !git, return and reply this.
    return;
  }

  const matchingUnits2 = units.filter((i, index) => { //make matchingUnits into a filter of units

    s1 = allArgs.replace(/[\s'-]*/g, '').toLowerCase();
    s2 = i.Name.replace(/[\s'-]*/g, '').toLowerCase();

    if (s2 == s1) { // check if unit includes allArgs
      return i;
    }
  });
  if (matchingUnits2.length === 0) {
    message.reply('No units matched with the name ' + allArgs);
  }


  if (matchingUnits2.length > limit) {
    message.reply(allArgs.toUpperCase() + ' is included in ' + matchingUnits2.length + ' units, please be more specific or use !gitspec (or !getspec) ');

    if (matchingUnits2.length < displaylimit) {
      i = matchingUnits2[0];
      if (matchingUnits2.length < 50) {
        const send = format.formatting(i);
        message.channel.send(send);
      }
      const matching = [];
      matchingUnits2.forEach((i) => {
        matching.push('**' + i.Name + '** | ');
      });
      message.channel.send('first unit sent, these are the other variations: ' + matching.join(''));
      return;

    } else if (matchingUnits2.length > 25) {
      message.reply('Too many matching units to display list');
    }
    return;

  }

  for (i of matchingUnits2) {

    const send = format.formatting(i);
    const filter = (reaction, user, member) => {
      return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.channel.send(send).then(m => {
      m.react('🗑');
      m.awaitReactions(filter, {
          max: 1,
          time: 15000,
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

};

module.exports.list = (args, message, displaylimit) => {

  var allArgs = '';
  for (let i = 0; i < args.length; i++) { //adds up all arguements after !git or !get into one single string named allArgs
    allArgs += args[i].toLowerCase() + ' ';
  }

  allArgs = allArgs.trim(); //strip any leading or trailing spaces

  if (allArgs === '') {
    message.reply('Command requires a parameter'); //if the user does !git <space> or !git, return and reply this.
    return;
  }

  const matchingUnits4 = units.filter((i, index) => { //make matchingUnits into a filter of units

    s1 = allArgs.replace(/[\s'-]*/g, '').toLowerCase();
    s2 = i.Name.replace(/[\s'-]*/g, '').toLowerCase();

    if (s2.match(s1)) { // check if unit includes allArgs
      return i;
    }
  });

  if (matchingUnits4.length === 0) {
    message.reply('No units matched with the name ' + allArgs);
  }

  if(matchingUnits4.length < displaylimit) {
    matching = [];
    matchingUnits4.forEach((i) => {
    matching.push('**' + i.Name + '** | ');

  });
  message.reply(matching.join(''));
} else {
  message.reply('Too many units to display list');
}


};

module.exports.ke = (args, message, heatdata) => {

  args[0] = args[0].replaceAll(' ', '');
  args[0] = args[0].toLowerCase();
  if (isNaN(args[0])) {
    message.reply('Please enter an armor value 1 - 25');
    return;
  }
  if (Number(args[0]) > 25 || Number(args[0]) < 1) {
    message.reply('Please enter an armor value 1 - 25');
    return;
  }
  args[0] = Number(args[0]);
  args[0] = Math.round(args[0]);
  const kedata = heatdata.filter((i, index) => {
    i.ArmorAP = i.ArmorAP.replaceAll('Armor ', '');
    const armor = i.ArmorAP.toLowerCase();
    if (armor == args[0]) {
      return i;
    }
  });
  kedata.forEach((i) => {
    const embed = new Discord.RichEmbed()
      .setTitle(i.ArmorAP + ' Armor Damage Table')
      .setColor('GREEN')
      .addField('1 - 18 **KE**', '**AP 1**: ' + i.KE1 + '**\nAP 2**: ' + i.KE2 + '**\nAP 3**: ' + i.KE3 + '\n**AP 4**: ' + i.KE4 + '**\nAP 5**: ' + i.KE5 + '\n**AP 6**: ' + i.KE6 + '\n**AP 7**: ' + i.KE7 + '\n**AP 8**: ' + i.KE8 + '\n**AP 9**: ' + i.KE9 + '**\nAP 10**: ' + i.KE10 + '**\nAP 11**: ' + i.KE11 + '**\nAP 12**: ' + i.KE12 + '**\nAP 13**: ' + i.KE13 + '**\nAP 14**: ' + i.KE14 + '**\nAP 15**: ' + i.KE15 + '**\nAP 16**: ' + i.KE16 + '**\nAP 17**: ' + i.KE17 + '**\nAP 18**: ' + i.KE18, true)
      .addField('19 - 36 **KE**', '**AP 19**: ' + i.KE19 + '\n**AP 20**: ' + i.KE20 + '\n**AP 21**: ' + i.KE21 + '\n**AP 22**: ' + i.KE22 + '\n**AP 23**: ' + i.KE23 + '**\nAP 24**: ' + i.KE24 + '\n**AP 25**: ' + i.KE25 + '\n**AP 26**: ' + i.KE26 + '\n**AP 27**: ' + i.KE27 + '\n**AP 28**: ' + i.KE28 + '\n**AP 29**: ' + i.KE29 + '\n**AP 30**: ' + i.KE30 + '\n**AP 31**: ' + i.KE31 + '\n**AP 32**: ' + i.KE32 + '\n**AP 33**: ' + i.KE33 + '\n**AP 34**: ' + i.KE34 + '\n**AP 35**: ' + i.KE35 + '\n**KE 36**: ' + i.KE36, true);

    message.channel.send(embed);
  });

};



module.exports.heat = (args, message, heatdata) => {


  args[0] = args[0].replaceAll(' ', '');
  args[0] = args[0].toLowerCase();
  if (isNaN(args[0])) {
    message.reply('Please enter an armor value 1 - 25');
    return;
  }
  if (Number(args[0]) > 25 || Number(args[0]) < 1) {
    message.reply('Please enter an armor value 1 - 25');
    return;
  }
  args[0] = Number(args[0]);
  args[0] = Math.round(args[0]);
  const apdata = heatdata.filter((i, index) => {
    i.ArmorAP = i.ArmorAP.replaceAll('Armor ', '');
    const armor = i.ArmorAP.toLowerCase();
    if (armor == args[0]) {
      return i;
    }
  });
  apdata.forEach((i) => {
    const embed = new Discord.RichEmbed()
      .setTitle(i.ArmorAP + ' Armor Damage Table')
      .setColor('BLUE')
      .addField('1 - 15', '**AP 1**: ' + i.AP1 + '**\nAP 2**: ' + i.AP2 + '**\nAP 3**: ' + i.AP3 + '\n**AP 4**: ' + i.AP4 + '**\nAP 5**: ' + i.AP5 + '\n**AP 6**: ' + i.AP6 + '\n**AP 7**: ' + i.AP7 + '\n**AP 8**: ' + i.AP8 + '\n**AP 9**: ' + i.AP9 + '**\nAP 10**: ' + i.AP10 + '**\nAP 11**: ' + i.AP11 + '**\nAP 12**: ' + i.AP12 + '**\nAP 13**: ' + i.AP13 + '**\nAP 14**: ' + i.AP14 + '**\nAP 15**: ' + i.AP15, true)
      .addField('16 - 30', '**AP 16**: ' + i.AP16 + '**\nAP 17**: ' + i.AP17 + '\n**AP 18**: ' + i.AP18 + '\n**AP 19**: ' + i.AP19 + '\n**AP 20**: ' + i.AP20 + '\n**AP 21**: ' + i.AP21 + '\n**AP 22**: ' + i.AP22 + '\n**AP 23**: ' + i.AP23 + '**\nAP 24**: ' + i.AP24 + '\n**AP 25**: ' + i.AP25 + '\n**AP 26**: ' + i.AP26 + '\n**AP 27**: ' + i.AP27 + '\n**AP 28**: ' + i.AP28 + '\n**AP 29**: ' + i.AP29 + '\n**AP 30**: ' + i.AP30, true);


    message.channel.send(embed);
  });


};
