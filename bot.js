const Discord = require('discord.js');
const COMMAND_CHAR = '!';
const client = new Discord.Client();
const prefix = '!';
const token = process.env.token;

const format = require('./Formatting.js');
const fs = require('fs');
const Q = require('q');
let status = "With razzmann's pp";
const csv = require('csv-parser');
let color;
let displaylimit = '20';
let limit = '3';
// let limitdisplay = '20';

const results = [];
var units = require('./Data.json');

// fs.createReadStream('./UnitData.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//
//     fs.writeFile('./Data.json', JSON.stringify(results), function(err) {
//     if (err) throw err;
//     console.log('Replaced!');
//     });
//   });


client.once('ready', () => {
    console.log('Bot running in the index file.');
    client.user.setPresence({ game: { name: status, type: 0 } });      //sets the bot's status to the default status
});


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


//start of commands

let nospaceunits = [];

for(let i = 0; i < units.length; i++) {
  units[i].Name = units[i].Name.replaceAll("'", '');
  units[i].Name = units[i].Name.replaceAll("-", ' ');
  units[i].Name = units[i].Name.replaceAll(" ", '');
}


client.on('message', async message => {


  if (message.author.bot) {
    return; //if the author of the message is the bot, do nothing.
  }

  if (!message.guild) {           //If the message is sent via DMs.
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

  const adminRoles = ['376252102843826176', '577607802197901332'];    //defines the roles considered as admins and returns either true or false with 'admin'
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

//adds up all of the items said after !changestatus and changes them into the bot's status
case 'test':
message.channel.fetchMessages({limit: 5}).then((messages) => console.log(Object.keys(messages)));


break;
case 'changestatus':
var allArgs = '';
for (let i = 0; i < args.length; i++) {
  allArgs += args[i].toLowerCase() + ' ';
}
if(message.author.id === '148830717617373184') {
status = allArgs;
client.user.setPresence({ game: { name: status, type: 0 } });
} else {
  message.channel.send('You do not have enough mayonnaise to complete this action');
}
break;

//checks if the arguement 0 (first thing after !changelimit) is a number, if it is, change the limit of units displayed with it

  case 'changelimit':
  if(!admin) {
    message.reply('You must be an admin to use this command');
  }
 else if (admin) {
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
  if(!admin) {
    message.reply('You must be an admin to use this command');
  }
 else if (admin) {
   if (!isNaN(args[0])) {
     displaylimit = args[0];
     message.channel.send('Changed display limit to ' + displaylimit);
   } else if (isNaN(args[0])) {
     message.channel.send('Please use a valid number');     // if args[0] is not a number, throw out args 0 and return this

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


    case 'flip':
    var coin = Math.floor(Math.random() * (2 - 1 + 1)) + 1;     //gets a random number 1 to 2

    if(coin == '1') {             //if the value is 1, return heads, if its 2, return tails
      message.reply('Heads');
    }
 else if (coin == '2') {
      message.reply('Tails');
    }
    break;




    //start of the actual armory function of the bot

    case 'get':
    case 'git':
    var allArgs = '';
    for (let i = 0; i < args.length; i++) {       //adds up all arguements after !git or !get into one single string named allArgs
      allArgs += args[i].toLowerCase() + ' ';
    }

    allArgs = allArgs.substring(0, allArgs.length - 1);     //the previous function prints a space after allArgs, using substring(), delete it
    allArgs = allArgs.toLowerCase();
    allArgs = allArgs.replaceAll('-', ' ');
    allArgs = allArgs.replaceAll(' ', '');
    console.log('"' + allArgs + '"');
    if(allArgs === ' ' || allArgs === '') {
      message.reply('Please use a valid unit');     //if the user does !git <space> or !git, return and reply this.
      return;
    }



  const matchingUnits = units.filter((i, index) =>{       //make matchingUnits into a filter of units
      const unit = i.Name.toLowerCase();
      if(unit.includes(allArgs)) {              // check if unit includes allArgs
        return i;
      }
    });

    if (matchingUnits.length === 0) {
      message.reply('No units matched with the name ' + allArgs);
    }

    if(matchingUnits.length > limit) {
        message.reply(allArgs.toUpperCase() + ' is included in ' + matchingUnits.length +  ' units, please be more specific or use !gitspec (or !getspec) ');

        if(matchingUnits.length < displaylimit) {
          const matching = [];
          matchingUnits.forEach((i) => {
            matching.push('**' + i.Name + '** | ');
          });
          message.reply(matching.join(''));


        } else if (matchingUnits.length > 25) {
          message.reply('Too many matching units to display list');
        }
        return;

    }


    matchingUnits.forEach((i) => {

const send = format.formatting(i);
message.channel.send(send);

      });

  break;



    // the GIT SPECIAL COMMAND


    case 'gitspec':
    case 'getspec':
    var allArgs = '';
    for (let i = 0; i < args.length; i++) {
      allArgs += args[i].toLowerCase() + ' ';
    }

    allArgs = allArgs.substring(0, allArgs.length - 1);
    allArgs = allArgs.toLowerCase();
    allArgs = allArgs.replaceAll('-', ' ');
    console.log('"' + allArgs + '"');
    if(allArgs === ' ' || allArgs === '') {
      message.reply('Please use a valid unit');
      return;
    }



        const matchingUnits2 = units.filter((i, index) =>{
              const unit = i.Name.toLowerCase();
              if(unit == allArgs) {
                return i;
              }
            });

            if (matchingUnits2.length === 0) {
              message.reply('No units matched with the name ' + allArgs);
            }

            if(matchingUnits2.length > limit) {
                message.reply(allArgs + ' is included in too many units, please be more specific or use !gitspec - limit: ' + limit);
              return;
            }
         else {
              matchingUnits2.forEach((i) => {
                const send = format.formatting(i);
                message.channel.send(send);


          });
      }
  break;

      case 'rookie':
        if (!message.member.roles.has('579034768243425346')) {
          message.member.addRole('579034768243425346');
          message.reply('Successfully added rookie role!');
        }
        else if (message.member.roles.has('579034768243425346')) {
          message.member.removeRole('579034768243425346');
          message.reply('Successfully removed rookie role!');
      }
      break;
      case 'lfg':
        if (!message.member.roles.has('579042113803649035')) {
          message.member.addRole('579042113803649035');
          message.reply('Successfully added lfg role!');
        }
        else if (message.member.roles.has('579042113803649035')) {
          message.member.removeRole('579042113803649035');
          message.reply('Successfully removed lfg role!');
      }
      break;
      case 'info':
      const embed = new Discord.RichEmbed()
      .setColor('GOLD')
      .setTitle('**Bootcamp/ Armory bot**')
      .setDescription('A bot developed by senorDickweed#7033 for the r/wargamebootcamp server, offers common commands and unit search functions, coded in discord.js, **for commands use !help**')
      .addField('Acknowledgements', '1: **Tyrnek#2495** for letting me do this lol \n 2: **Lawlzer#4013** for helping a lot on the code \n 3: **Mbetts#9468** for helping me a lot on the formatting and the code \n 4: **Phlogis#9776** for helping with the data aspect of the units \n 5: **everyone** on the testing server that helped me test the bot');
      message.channel.send(embed);
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
      case 'commands':
      case 'help':
      message.reply("**!git <unit>** - **!rookie** - Gives you the rookie role \n **!lfg** - Adds you to the looking for game pool \n **!unspecguide** - A great beginner deck building guide \n **!specprimer** - A great primer to spec decks and how to counter them \n **!honguide** - A great beginner's guide to wargame \n **!razzguide** - Razzmann's video wargame guides \n **!keyvalues** - Values worth remembering  \n **!armorytool** - A great tool for viewing hidden unit stats \n **!replayfolder** - Where game replays are stored \n **!rof** - A great Rate of Fire cheatsheet \n **!bling** - How to get colors and tags in wargame \n **!progression** - Reccomended progression guide for beginners\n **!rankedmaps** - List of maps in the ranked pool");
      break;
      case 'admin':
      message.reply('List of admin commands: \n **!ban @user** - bans the user \n **!kick @user** - Kicks the user \n **!edit *object* *parameter* *change* ** - Edits an object\'s parameters \n **!deletearty *object* ** - Deletes an artillery object \n **!deletehelicopter *object* ** - Deletes a helicopter object \n **!createarty ,name, weapon1, weapon2, weapon3, weapon4, range, speed, shotreload, supplycost, aimtime, dispersion, cost** - creates an artillery object \n **!createhelicopter , placeholder, ** - creates a helicopter object \n\n ***When creating an object, do not put a space between the commas and the name to avoid a bugged object. ex: ,name , ------> ,name,***');
      break;
  }
});


// DONT MIND THIS CODE, i know its absolute shit, but im too lazy to make it better lol

client.on('message', message => {
	if (message.content.startsWith('!mud')) {
      message.channel.send('here is the map', { files: ['./Pictures/map pictures/mud.png'] });
    }
	else if (message.content.startsWith('!plunjing')) {
      message.channel.send('here is the map', { files: ['./Pictures/map pictures/plunjing.png'] });
    }
	else if (message.content.startsWith('!paddy')) {
      message.channel.send('here is the map', { files: ['./Pictures/map pictures/paddy.png'] });
    }
  else if (message.content.startsWith('!punchbowl')) {
      message.channel.send('here is the map', { files: ['./Pictures/map pictures/punchbowl.png'] });
    }
  else if (message.content.startsWith('!hell')) {
      message.channel.send('here is the map', { files: ['./Pictures/map pictures/hell.png'] });
    }
  else if (message.content.startsWith('!highway')) {
      message.channel.send('here is the map', { files: ['./Pictures/map pictures/highway.png'] });
    }
  else if (message.content.startsWith(`!nuclear`)) {
      message.channel.send('here is the map', { files: ['./Pictures/map pictures/nuclear.png'] });
    }
});
client.login(token);
