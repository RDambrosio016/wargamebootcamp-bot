const Discord = require('discord.js');
const COMMAND_CHAR = '!';
const client = new Discord.Client();
const prefix = '!';
const commands = require('./ArmoryCommands.js');
const commonCommands = require('./Commands.js');
const token = process.env.token;
const format = require('./Formatting.js');
const fs = require('fs');
const Q = require('q');
let status = "​";
const csv = require('csv-parser');
let color;
let displaylimit = '20';
let limit = '3';
var heatdata = require('./HeatKeData.json');
let commoncommands = true;
const results = [];
var units = require('./UnitData.json');

// fs.createReadStream('./Heat-KeValues.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//
//     fs.writeFile('./HeatKeData.json', JSON.stringify(results), function(err) {
//     if (err) throw err;
//     console.log('Replaced!');
//     });
//   });


client.once('ready', () => {
  console.log('Bot running in the index file.');
  client.user.setPresence({
    game: {
      name: status,
      type: 'WATCHING',
    },
  }); //sets the bot's status to the default status
});


String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

units.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));       //sort the units by name

//start of commands


client.on('message', async message => {

  const member = await message.guild.fetchMember(message.author.id);

  if (message.author.bot) {
    return; //if the author of the message is the bot, do nothing.
  }

  if (!message.guild) { //If the message is sent via DMs.
    message.reply('Please do not message this bot in DMs.');
    return;
  }
  const args = message.content.split(' ');
  const capitalArgs = message.content.split(' ');
  for (let i = args.length - 1; i >= 0; i--) {
    args[i] = args[i];
  }
  var argsCommaSplit = message.content.split(',');
  var commandName = args.shift();
  if (!commandName.startsWith(COMMAND_CHAR)) {
    return;
  }
  commandName = commandName.slice(1);

  const adminRoles = ['376252102843826176', '577607802197901332', '584124615647821857']; //defines the roles considered as admins and returns either true or false with 'admin'
  let admin;
  for (let i = adminRoles.length - 1; i >= 0; i--) {
    if (message.member.roles.has(adminRoles[i])) {
      admin = true;
      break;
    }
    admin = false;
  }

  //allows you to check if youre an admin

  if (commandName === 'checkadmin') {
    message.reply(admin ? 'You have the power.' : 'You do not have anough power, mortal.');
  }

  if (commandName === 'ping') {
    message.reply('pong');
  }


  // write commands below this line ---------------------------------------------------


  switch (commandName) {

    case 'dynocommands':
      if (!admin) {
        message.reply('Not enough admin mayo to complete this action');
        return;
      }
      if (commoncommands === true) {
        message.reply('Turned off dyno commands');
        commoncommands = false;
        return;
      } else if (commoncommands === false) {
        message.reply('Turned on dyno commands');
        commoncommands = true;
        console.log(commoncommands);
        return;
      }
      break;
      //adds up all of the items said after !changestatus and changes them into the bot's status
    case 'test':
      message.channel.fetchMessages({
        limit: 5,
      }).then((messages) => console.log(Object.keys(messages)));


      break;
    case 'changestatus':
      var allArgs = '';
      for (let i = 0; i < args.length; i++) {
        allArgs += args[i].toLowerCase() + ' ';
      }
      if (message.author.id === '148830717617373184') {
        status = allArgs;
        client.user.setPresence({
          game: {
            name: status,
            type: 'WATCHING',
          },
        });
      } else {
        message.channel.send('You do not have enough mayonnaise to complete this action');
      }
      break;

      //checks if the arguement 0 (first thing after !changelimit) is a number, if it is, change the limit of units displayed with it

    case 'changelimit':
      if (!admin) {
        message.reply('You must be an admin to use this command');
      } else if (admin) {
        if (!isNaN(args[0])) {
          limit = args[0];
          message.channel.send('Changed unit limit to ' + limit);
        } else if (isNaN(args[0])) {
          message.channel.send('Please use a valid number');

        }
      }
      break;

      //same as !changelimit but changes the limit of matching units displayed in the list

    case 'changedisplaylimit':
      if (!admin) {
        message.reply('You must be an admin to use this command');
      } else if (admin) {
        if (!isNaN(args[0])) {
          displaylimit = args[0];
          message.channel.send('Changed display limit to ' + displaylimit);
        } else if (isNaN(args[0])) {
          message.channel.send('Please use a valid number'); // if args[0] is not a number, throw out args 0 and return this

        }
      }
      break;

      // displays the unit limit

    case 'limit':
      message.reply(limit);
      break;


    case 'displaylimit':
      message.reply(displaylimit);
      break;




    //case 'flip':
     // var coin = Math.floor(Math.random() * (2 - 1 + 1)) + 1; //gets a random number 1 to 2

     // if (coin == '1') { //if the value is 1, return heads, if its 2, return tails
       // message.reply('Heads');
     // } else if (coin == '2') {
    //    message.reply('Tails');
   //   }
   //   break;





      //start of the actual armory function of the bot
      case 'git':
      commands.git(args, message, limit, displaylimit);
      break;

    case 'gitlist':
      commands.gitlist(args, message, limit, displaylimit);
      break;

      case 'list':
      commands.list(args, message, displaylimit);
      break;
    case 'gitpm':
    commands.gitpm(args, message);
      break;
    case 'gitspec':
    commands.gitspec(args, message, limit, displaylimit);
      break;

    case 'heat':
      commands.heat(args, message, heatdata);
      break;
    case 'ke':
      commands.ke(args, message, heatdata);
    break;

    case "resetcommands":
      commonCommands.botcommands(client, admin);
      break;

    case 'invite':
    commonCommands.invite(message, admin, args);
    break;

    case 'duckinfo':
      const embed = new Discord.RichEmbed()
        .setColor('GOLD')
        .setTitle('**Bootcamp/ Armory bot**')
        .setDescription('A bot developed by senorDickweed#7033 for the r/wargamebootcamp server, offers common commands and unit search functions, coded in discord.js, **for commands use !help**')
        .addField('Acknowledgements', '1: **Tyrnek#2495** for letting me do this lol \n 2: **Lawlzer#4013** for helping a lot on the code \n 3: **Mbetts#9468** for helping me a lot on the formatting and the code \n 4: **Phlogis#9776** for helping with the data aspect of the units \n 5: **Crankytoaster#1240** for telling me everything wrong with it lol \n 6: **rogertheshrubb3r#0862** for the amazing regexp search algorithm and more \n 5: **everyone** on the testing server that helped me test the bot')
        .addField('Code', 'https://github.com/duckthecuck/wargamebootcamp-bot');
      message.channel.send(embed);
      break;
      case 'code':
      message.reply('https://github.com/duckthecuck/wargamebootcamp-bot');
      break;

    case 'commands':
    case 'duckhelp':
    commonCommands.help(args, message);
    break;
    case 'adminhelp':
      commonCommands.adminhelp(args, message);
      break;

  }


  if (commoncommands == true) {
    switch (commandName) {
      case 'rookie':
        if (!message.member.roles.has('502524273731043328')) {
          message.member.addRole('502524273731043328');
          message.reply('Successfully added rookie role!');
        } else if (message.member.roles.has('502524273731043328')) {
          message.member.removeRole('502524273731043328');
          message.reply('Successfully removed rookie role!');
        }
        break;
      case 'lfg':
        if (!message.member.roles.has('351126993838014476')) {
          message.member.addRole('351126993838014476');
          message.reply('Successfully added lfg role!');
        } else if (message.member.roles.has('351126993838014476')) {
          message.member.removeRole('351126993838014476');
          message.reply('Successfully removed lfg role!');
        }
        break;
      case 'unspecguide':
        message.reply('Here is the beginner unspec deck building guide: https://www.reddit.com/r/wargamebootcamp/comments/5m0wmz/meta_a_guide_to_unspec_deckbuilding/');
        break;
      case 'specprimer':
        message.reply('Here is the spec primer: https://www.reddit.com/r/wargamebootcamp/comments/8pppyi/meta_a_basic_primer_to_spec_decks/');
        break;
      case 'honguide':
        message.reply('Here is the hon beginner guide: https://honhonhonhon.wordpress.com/how-to-get-started-with-wargame/');
        break;
      case 'razzguide':
        message.reply("Here is Razzmann's video guides: https://www.youtube.com/playlist?list=PL3d-ZYWK9TPkb8zuvxNRArw1gyi1fgb0R");
        break;
      case 'keyvalues':
        message.reply('Here is a link to the Key Values to remember: https://www.reddit.com/r/wargamebootcamp/comments/7oj7nx/list_of_key_values_to_keep_track_of_for_beginners/');
        break;
      case 'armorytool':
        message.reply('Here is a link to the armory tool: https://forums.eugensystems.com/viewtopic.php?t=59265');
        break;
      case 'replayfolder':
        message.reply('here is the directory for the replay folder: \n\n *Windows: C:\\Users%username%\\Saved Games\\EugenSystems\\WarGame3* \n\nLinux: ~/.config/EugenSystems/Wargame3/saves \n\n Mac: [Hard drive] > Users > [your account] > Library > Application Support > EugenSystems > Wargame3 > SavedGames');
        break;
      case 'rof':
        message.reply('Here is a link to the rate of fire spreadsheet: https://docs.google.com/spreadsheets/d/1dx28wRZ_3ofnP7kWKcoziGpPw2tOAJcixnuiKjJPL-A/edit#gid=1401351233');
        break;
      case 'bling':
        message.reply('here is the bling guide: https://steamcommunity.com/sharedfiles/filedetails/?id=355698402');
        break;
      case 'progression':
        message.reply('RD Player Progression: What the fuck am I doing -> Ordering units around -> Mastering hotkeys and keybinds -> Tactical level micro: Fundamentals of Infantry, Tanks, and Smoke -> Tactical Micro: Support units -> Tactical Micro: Air Power -> Learning what makes units good -> Macro thinking: Force Dispositions, Capabilities, & Concentration -> Macro thinking: Reacting to & Countering cheese -> Macro Thinking: Teamgame Considerations');
        break;
      case 'rankedmaps':
        message.reply('1v1: \n\n **Mud fight** \n\n **Plunjing valley** \n\n **Paddy field** \n\n **Punchbowl** \n\n **Hell in a very small place** \n\n **Highway to seoul** \n\n **Nuclear winter**');
        break;
    }
  }
});

// DONT MIND THIS CODE, i know its absolute shit, but im too lazy to make it better lol

client.on('message', message => {
  if (message.content.startsWith('!mud')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/mud.png'],
    });
  } else if (message.content.startsWith('!plunjing')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/plunjing.png'],
    });
  } else if (message.content.startsWith('!paddy')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/paddy.png'],
    });
  } else if (message.content.startsWith('!punchbowl')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/punchbowl.png'],
    });
  } else if (message.content.startsWith('!hell')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/hell.png'],
    });
  } else if (message.content.startsWith('!highway')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/highway.png'],
    });
  } else if (message.content.startsWith(`!nuclear`)) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/nuclear.png'],
    });
  }
});
client.login(token);
