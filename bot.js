const Discord = require('discord.js');
const COMMAND_CHAR = '!';
const client = new Discord.Client();
const prefix = '!';
const token = process.env.token;
const fs = require('fs');
const Q = require('q');
let status = "With razzmann's pp";
// var value = firstline('./final_data.csv').then(console.log(value));
let color;
let limit = '3';
const results = [];
var units = require('./things.json');

client.once('ready', () => {
    console.log('Bot running in the index file.');
    client.user.setPresence({ game: { name: status, type: 0 } });
});

//start of commands



client.on('message', async message => {


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
  const adminRoles = ['376252102843826176', '577607802197901332'];
  let admin;
  for (let i = adminRoles.length - 1; i >= 0; i--) {
    if (message.member.roles.has(adminRoles[i])) {
      admin = true;
      break;
    }
    admin = false;
  }


  if (commandName === 'checkadmin') {
    message.reply(admin ? 'You have the power.' : 'You do not have anough power, mortal.');
  }

  if (commandName === 'ping') {
    message.reply('pong');
  }


    // write commands below this line ---------------------------------------------------


  switch (commandName) {

    // case 'colors':
    // if(admin) {
    //   message.reply('\n White \n Aqua \n Green \n Blue \n Purple \n Luminous_Vivid_Pink \n Gold \n Orange \n Red \n Grey \n Darker_Gray \n Navy \n Dark_Aqua \n Dark_Green \n Dark_Blue \n Dark_Purple \n Dark_Vivid_Pink \n Dark_Gold \n Dark_Orange \n Dark_Red \n Dark_Grey \n Light_Grey \n Dark_Navy \n Random');
    // } else {
    //   return;
    // }
    // case 'setcolor':
    // if(admin && isNaN(message.content)) {
    //     color = args[0].toUpperCase();
    //     message.reply('Changed color to ' + color.toLowerCase());
    // } else if (!admin) {
    //
    //   message.reply('You must be an admin to use this command');
    // }

case 'changestatus':
var allArgs = '';
for (let i = 0; i < args.length; i++) {
  allArgs += args[i].toLowerCase() + ' ';
}
if(message.author.id === '148830717617373184') {
status = allArgs;
client.user.setPresence({ game: { name: status, type: 0 } });
}
break;
// break;
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

  case 'limit':
  message.reply(limit);
  break;


    case 'flip':
    var coin = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

    if(coin == '1') {
      message.reply('Heads');
    }
 else if (coin == '2') {
      message.reply('Tails');
    }
    break;






    case 'git':
    var allArgs = '';
    for (let i = 0; i < args.length; i++) {
      allArgs += args[i].toLowerCase() + ' ';
    }

    allArgs = allArgs.substring(0, allArgs.length - 1);
    console.log('"' + allArgs + '"');
    if(allArgs === ' ' || allArgs === '') {
      message.reply('Please use a valid unit');
      return;
    }


  const matchingUnits = units.filter((i, index) =>{
      const unit = i.Name.toLowerCase();
      if(unit.includes(allArgs)) {
        return i;
      }
    });

    if(matchingUnits.length > limit) {
      message.reply(allArgs + ' is included in too many units, please be more specific or use !gitspec - limit: ' + limit);
      return;
    }
 else {

        matchingUnits.forEach((i) => {

      const redfor = {
        "Poland":":flag_pl:",
        'Czechoslavakia': ':flag_cz:',
        'Soviet Union':'<:flag_sr:581691631523069952>',
        'Yugoslavia':'<:emote:581895502568620110>',
        'Finland':':flag_fi:',
        'East Germany':'<:unknown:581897376000638996>',
        'China':':flag_cn',
        'North Korea':'<:download:581897628959375372>',

      };

      const blufor = {
        "France":":flag_fr:",
        'Canada':':flag_ca:',
        'Sweden':':flag_se:',
        'The Netherlands':':flag_nl:',
        'ANZAC':':flag_au:',
        'Israel':':flag_il:',
        'United Kingdom':':flag_gb:',
        'Japan':':flag_jp:',
        'United States':':flag_us:',
        'West Germany':':flag_de:',
        'Denmark':':flag_dk:',
        'South Korea':'kr',
        'Norway':':flag_no:',

      };

      if(blufor.hasOwnProperty(i.MotherCountry)) {
          i.MotherCountry = blufor[i.MotherCountry];
          color = "BLUE";
      } else if(redfor.hasOwnProperty(i.MotherCountry)) {
          i.MotherCountry = redfor[i.MotherCountry];
          color = "RED";
      }




    let dash = ' - ';
    if(i.Weapon1RangeGroundMinimum === '') {dash = '';}
    let dash2 = ' - ';
    if(i.Weapon1RangeHelicoptersMinimum === '') {dash2 = '';}


    if(i.Tab === 'SUP') {
        if(i.ArmorFrontSplashResistant ===  'True') {
              i.ArmorFront = '0';
    }  if(i.ArmorSidesSplashResistant ===  'True') {
            i.ArmorSides = '0';
    }  if(i.ArmorRearSplashResistant ===  'True') {
              i.ArmorRear = '0';
    } if(i.ArmorTopSplashResistant ===  'True') {
              i.ArmorTop = '0';
    }
    let proto;
    if(i.IsPrototype.toLowerCase() === 'false') {
        proto = '**Not prototype**';
    }
    else if (i.IsPrototype.toLowerCase() === 'true') {
     proto = '**Prototype**';
    }

    const supply = Math.trunc(i.Weapon1SupplyCost / i.Weapon1ShotsPerSalvo);

    let weapon2 = ('**Weapon 1**: ' + i.Weapon2Name + ', ' + i.Weapon2Caliber + ' x' + Math.trunc(i.Weapon2DisplayedAmmunition) + ', **' + i.Weapon2Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon2RangeGround) + dash + Math.trunc(i.Weapon2RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon2RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon2RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon2DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon2DispersionAtMaxRange) + ' | **AP Power**: ' + Math.trunc(i.Weapon2AP) + ' | **HE Power**: ' + Math.trunc(i.Weapon2HE) + ' | **Salvo**: ' + Math.trunc(i.Weapon2ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon2SupplyCost) + ' per salvo');
    if(i.Weapon2Name == '') { weapon2 = 'None';}
    let weapon3 = ('**Weapon 1**: ' + i.Weapon3Name + ', ' + i.Weapon3Caliber + ' x' + Math.trunc(i.Weapon3DisplayedAmmunition) + ', **' + i.Weapon3Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon3RangeGround) + dash + Math.trunc(i.Weapon3RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon3RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon3RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon3DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon3DispersionAtMaxRange) + ' | **AP Power**: ' + Math.trunc(i.Weapon3AP) + ' | **HE Power**: ' + Math.trunc(i.Weapon3HE) + ' | **Salvo**: ' + Math.trunc(i.Weapon3ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon3SupplyCost) + ' per salvo');
    if(i.Weapon3Name == '') { weapon3 = 'None';}
const embed = new Discord.RichEmbed()
  .setTitle('**' + i.Name.toUpperCase() + '**')
  .setDescription('**Price**:' + i.Price +  ' | **Armor: ** Front: ' + i.ArmorFront + ' | Sides: ' + i.ArmorSides + ' | Rear: ' + i.ArmorRear + ' | Top: ' + i.ArmorTop)
  .setColor(color)
  .addField('**Category**', '**Support Tab** | **Nationality**: ' + i.MotherCountry + ' | ' + proto)
  .addField('**Movement**', '**Type**: ' + i.MovementType + ' | **Offroad Speed**: ' + Math.trunc(i.MaxSpeed) + 'kph')
  .addField('**Availability**', i.RookieDeployableAmount + '/ ' + i.TrainedDeployableAmount + '/ ' + i.HardenedDeployableAmount + '/ ' + i.VeteranDeployableAmount + '/ ' + i.EliteDeployableAmount)
  .addField('**Weapon 1 ( ' + i.Weapon1Type + ')**', '**Weapon 1**: ' + i.Weapon1Name + ', ' + i.Weapon1Caliber + ' x' + Math.trunc(i.Weapon1DisplayedAmmunition) + ', **' + i.Weapon1Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon1RangeGround) + dash + Math.trunc(i.Weapon1RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon1RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon1RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon1DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon1DispersionAtMaxRange) + ' | **AP Power**: ' + Math.trunc(i.Weapon1AP) + ' | **HE Power**: ' + Math.trunc(i.Weapon1HE) + ' | **Salvo**: ' + Math.trunc(i.Weapon1ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon1SupplyCost) + ' per salvo', true)
  .addField('**Weapon 2 ( ' + i.Weapon2Type + ')**', weapon2)
  .addField('**Weapon 3 ( ' + i.Weapon3Type + ')**', weapon3);

message.channel.send(embed);

}
        });
    }
break;

    // the GIT SPECIAL COMMAND


    case 'gitspec':
    var allArgs = '';
    for (let i = 0; i < args.length; i++) {
      allArgs += args[i].toLowerCase() + ' ';
    }
        allArgs = allArgs.substring(0, allArgs.length - 1);
        console.log('"' + allArgs + '"');
        if(allArgs === ' ' || allArgs === '') {
          message.reply('Please use a valid unit');
          return;
        }

        const matchingUnits2 = units.filter((i, index) =>{
              const unit = i.Name.toLowerCase();
              if(unit === allArgs) {
                return i;
              }
            });

            if(matchingUnits2.length > limit) {
                message.reply(allArgs + ' is included in too many units, please be more specific or use !gitspec - limit: ' + limit);
              return;
            }
         else {
              matchingUnits2.forEach((i) => {

        const redfor = {
          "Poland":":flag_pl:",
          'Czechoslavakia': ':flag_cz:',
          'Soviet Union':'<:flag_sr:581691631523069952>',
          'Yugoslavia':'<:emote:581895502568620110>',
          'Finland':':flag_fi:',
          'East Germany':'<:unknown:581897376000638996>',
          'China':':flag_cn',
          'North Korea':'<:download:581897628959375372>',

        };

        const blufor = {
          "France":":flag_fr:",
          'Canada':':flag_ca:',
          'Sweden':':flag_se:',
          'The Netherlands':':flag_nl:',
          'ANZAC':':flag_au:',
          'Israel':':flag_il:',
          'United Kingdom':':flag_gb:',
          'Japan':':flag_jp:',
          'United States':':flag_us:',
          'West Germany':':flag_de:',
          'Denmark':':flag_dk:',
          'South Korea':'kr',
          'Norway':':flag_no:',

        };

        if(blufor.hasOwnProperty(i.MotherCountry)) {
            i.MotherCountry = blufor[i.MotherCountry];
            color = "BLUE";
        } else if(redfor.hasOwnProperty(i.MotherCountry)) {
            i.MotherCountry = redfor[i.MotherCountry];
            color = "RED";
        }




      let dash = ' - ';
      if(i.Weapon1RangeGroundMinimum === '') {dash = '';}
      let dash2 = ' - ';
      if(i.Weapon1RangeHelicoptersMinimum === '') {dash2 = '';}


      if(i.Tab === 'SUP') {
          if(i.ArmorFrontSplashResistant ===  'True') {
                i.ArmorFront = '0';
      }  if(i.ArmorSidesSplashResistant ===  'True') {
              i.ArmorSides = '0';
      }  if(i.ArmorRearSplashResistant ===  'True') {
                i.ArmorRear = '0';
      } if(i.ArmorTopSplashResistant ===  'True') {
                i.ArmorTop = '0';
      }
      let proto;
      if(i.IsPrototype.toLowerCase() === 'false') {
          proto = '**Not prototype**';
      }
      else if (i.IsPrototype.toLowerCase() === 'true') {
       proto = '**Prototype**';
      }

      const supply = Math.trunc(i.Weapon1SupplyCost / i.Weapon1ShotsPerSalvo);

      let weapon2 = ('**Weapon 1**: ' + i.Weapon2Name + ', ' + i.Weapon2Caliber + ' x' + Math.trunc(i.Weapon2DisplayedAmmunition) + ', **' + i.Weapon2Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon2RangeGround) + dash + Math.trunc(i.Weapon2RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon2RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon2RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon2DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon2DispersionAtMaxRange) + ' | **AP Power**: ' + Math.trunc(i.Weapon2AP) + ' | **HE Power**: ' + Math.trunc(i.Weapon2HE) + ' | **Salvo**: ' + Math.trunc(i.Weapon2ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon2SupplyCost) + ' per salvo');
      if(i.Weapon2Name == '') { weapon2 = 'None';}
      let weapon3 = ('**Weapon 1**: ' + i.Weapon3Name + ', ' + i.Weapon3Caliber + ' x' + Math.trunc(i.Weapon3DisplayedAmmunition) + ', **' + i.Weapon3Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon3RangeGround) + dash + Math.trunc(i.Weapon3RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon3RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon3RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon3DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon3DispersionAtMaxRange) + ' | **AP Power**: ' + Math.trunc(i.Weapon3AP) + ' | **HE Power**: ' + Math.trunc(i.Weapon3HE) + ' | **Salvo**: ' + Math.trunc(i.Weapon3ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon3SupplyCost) + ' per salvo');
      if(i.Weapon3Name == '') { weapon3 = 'None';}
  const embed = new Discord.RichEmbed()
    .setTitle('**' + i.Name.toUpperCase() + '**')
    .setDescription('**Price**:' + i.Price +  ' | **Armor: ** Front: ' + i.ArmorFront + ' | Sides: ' + i.ArmorSides + ' | Rear: ' + i.ArmorRear + ' | Top: ' + i.ArmorTop)
    .setColor(color)
    .addField('**Category**', '**Support Tab** | **Nationality**: ' + i.MotherCountry + ' | ' + proto)
    .addField('**Movement**', '**Type**: ' + i.MovementType + ' | **Offroad Speed**: ' + Math.trunc(i.MaxSpeed) + 'kph')
    .addField('**Availability**', i.RookieDeployableAmount + '/ ' + i.TrainedDeployableAmount + '/ ' + i.HardenedDeployableAmount + '/ ' + i.VeteranDeployableAmount + '/ ' + i.EliteDeployableAmount)
    .addField('**Weapon 1 ( ' + i.Weapon1Type + ')**', '**Weapon 1**: ' + i.Weapon1Name + ', ' + i.Weapon1Caliber + ' x' + Math.trunc(i.Weapon1DisplayedAmmunition) + ', **' + i.Weapon1Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon1RangeGround) + dash + Math.trunc(i.Weapon1RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon1RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon1RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon1DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon1DispersionAtMaxRange) + ' | **AP Power**: ' + Math.trunc(i.Weapon1AP) + ' | **HE Power**: ' + Math.trunc(i.Weapon1HE) + ' | **Salvo**: ' + Math.trunc(i.Weapon1ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon1SupplyCost) + ' per salvo', true)
    .addField('**Weapon 2 ( ' + i.Weapon2Type + ')**', weapon2)
    .addField('**Weapon 3 ( ' + i.Weapon3Type + ')**', weapon3);

  message.channel.send(embed);

  }
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
      message.reply("**!rookie** - Gives you the rookie role \n **!lfg** - Adds you to the looking for game pool \n **!unspecguide** - A great beginner deck building guide \n **!specprimer** - A great primer to spec decks and how to counter them \n **!honguide** - A great beginner's guide to wargame \n **!razzguide** - Razzmann's video wargame guides \n **!keyvalues** - Values worth remembering  \n **!armorytool** - A great tool for viewing hidden unit stats \n **!replayfolder** - Where game replays are stored \n **!rof** - A great Rate of Fire cheatsheet \n **!bling** - How to get colors and tags in wargame \n **!progression** - Reccomended progression guide for beginners\n **!rankedmaps** - List of maps in the ranked pool");
      break;
      case 'admin':
      message.reply('List of admin commands: \n **!ban @user** - bans the user \n **!kick @user** - Kicks the user \n **!edit *object* *parameter* *change* ** - Edits an object\'s parameters \n **!deletearty *object* ** - Deletes an artillery object \n **!deletehelicopter *object* ** - Deletes a helicopter object \n **!createarty ,name, weapon1, weapon2, weapon3, weapon4, range, speed, shotreload, supplycost, aimtime, dispersion, cost** - creates an artillery object \n **!createhelicopter , placeholder, ** - creates a helicopter object \n\n ***When creating an object, do not put a space between the commas and the name to avoid a bugged object. ex: ,name , ------> ,name,***');
      break;
  }
});


// DONT MIND THIS CODE, i know its absolute shit, but im too lazy to make it better lol

client.on('message', message => {
	if (message.content.startsWith(`${prefix}mud`)) {
      message.channel.send('here is the map', { files: ['./map pictures/mud.png'] });
    }
	else if (message.content.startsWith(`${prefix}plunjing`)) {
      message.channel.send('here is the map', { files: ['./map pictures/plunjing.png'] });
    }
	else if (message.content.startsWith(`${prefix}paddy`)) {
      message.channel.send('here is the map', { files: ['./map pictures/paddy.png'] });
    }
  else if (message.content.startsWith(`${prefix}punchbowl`)) {
      message.channel.send('here is the map', { files: ['./map pictures/punchbowl.png'] });
    }
  else if (message.content.startsWith(`${prefix}hell`)) {
      message.channel.send('here is the map', { files: ['./map pictures/hell.png'] });
    }
  else if (message.content.startsWith(`${prefix}highway`)) {
      message.channel.send('here is the map', { files: ['./map pictures/highway.png'] });
    }
  else if (message.content.startsWith(`${prefix}nuclear`)) {
      message.channel.send('here is the map', { files: ['./map pictures/nuclear.png'] });
    }
});
client.login(token);
