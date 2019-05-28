const Discord = require('discord.js');
module.exports.formatting = (i) => {


  let proto;

  let armorfront;
  let armorsides;
  let armorrear;
  let armortop;

  const weapon1rof = Math.round(60 * i.Weapon1ShotsPerSalvo / ((i.Weapon1ShotsPerSalvo - 1) * i.Weapon1TimeBetweenShots - - i.Weapon1TimeBetweenSalvos));
  const weapon2rof = Math.round(60 * i.Weapon2ShotsPerSalvo / ((i.Weapon2ShotsPerSalvo - 1) * i.Weapon2TimeBetweenShots - - i.Weapon2TimeBetweenSalvos));
  const weapon3rof = Math.round(60 * i.Weapon3ShotsPerSalvo / ((i.Weapon3ShotsPerSalvo - 1) * i.Weapon3TimeBetweenShots - - i.Weapon3TimeBetweenSalvos));
  const weapon4rof = Math.round(60 * i.Weapon4ShotsPerSalvo / ((i.Weapon4ShotsPerSalvo - 1) * i.Weapon4TimeBetweenShots - - i.Weapon4TimeBetweenSalvos));

  let weapon1round;
  let weapon2round;
  let weapon3round;
  let weapon4round;

  const supply = Math.trunc(i.Weapon1SupplyCost / i.Weapon1ShotsPerSalvo);


  const redfor = {


    "Poland":":flag_pl:",
    'Czechoslavakia': ':flag_cz:',
    'Soviet Union':'<:flag_sr:581691631523069952>',
    'Yugoslavia':'<:emote:581895502568620110>',
    'Finland':':flag_fi:',
    'East Germany':'<:unknown:581897376000638996>',
    'China':':flag_cn:',
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
    'South Korea':':flag_kr:',
    'Norway':':flag_no:',

  };

  if(blufor.hasOwnProperty(i.MotherCountry)) {
      i.MotherCountry = blufor[i.MotherCountry];
      color = "BLUE";
  } else if(redfor.hasOwnProperty(i.MotherCountry)) {
      i.MotherCountry = redfor[i.MotherCountry];
      color = "RED";
  }

if (i.Weapon1HE < 1) { weapon1round = i.Weapon1HE; } else { weapon1round = Math.trunc(i.Weapon1HE);};
if (i.Weapon2HE < 1) { weapon2round = i.Weapon2HE; } else { weapon2round = Math.trunc(i.Weapon2HE);};
if (i.Weapon3HE < 1) { weapon3round = i.Weapon3HE; } else { weapon3round = Math.trunc(i.Weapon3HE);};
if (i.Weapon4HE < 1) { weapon4round = i.Weapon4HE; } else { weapon4round = Math.trunc(i.Weapon4HE);};




  if(i.ArmorFrontSplashResistant ===  'True') {
          armorfront = i.ArmorFront + ' **SPLASH**';
} else {
  armorfront = i.ArmorFront;
}
  if(i.ArmorSidesSplashResistant ===  'True') {
          armorsides = i.ArmorSides + ' **SPLASH**';
  } else {
  armorsides = i.ArmorSides;
}
  if(i.ArmorRearSplashResistant ===  'True') {
          armorrear = i.ArmorRear + ' **SPLASH**';
  } else {
  armorrear = i.ArmorRear;
}
  if(i.ArmorTopSplashResistant ===  'True') {
          armortop = i.ArmorTop + ' **SPLASH**';
  } else {
  armortop = i.ArmorTop;
}

if(i.IsPrototype.toLowerCase() === 'false') {
    proto = '**Not prototype**';
}
else if (i.IsPrototype.toLowerCase() === 'true') {
 proto = '**Prototype**';
}




let weapon2 = ('**Weapon 1**: ' + i.Weapon2Name + ', ' + i.Weapon2Caliber + ' x' + Math.trunc(i.Weapon2DisplayedAmmunition) + ', **' + i.Weapon2Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon2RangeGround) + ' - ' + Math.trunc(i.Weapon2RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon2RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon2RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon2DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon2DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon2AP + ' | **HE Power**: ' + weapon2round + ' | **Salvo**: ' + Math.trunc(i.Weapon2ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon2SupplyCost) + ' per salvo | **ROF**: ' + weapon2rof);
if(i.Weapon2Name == '') { weapon2 = 'None';}
let weapon3 = ('**Weapon 1**: ' + i.Weapon3Name + ', ' + i.Weapon3Caliber + ' x' + Math.trunc(i.Weapon3DisplayedAmmunition) + ', **' + i.Weapon3Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon3RangeGround) + ' - ' + Math.trunc(i.Weapon3RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon3RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon3RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon3DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon3DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon3AP + ' | **HE Power**: ' + weapon3round + ' | **Salvo**: ' + Math.trunc(i.Weapon3ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon3SupplyCost) + ' per salvo | **ROF**: ' + weapon3rof);
if(i.Weapon3Name == '') { weapon3 = 'None';}



const embed = new Discord.RichEmbed()


  .setTitle('**' + i.Name.toUpperCase() + '**')
  .setDescription('**Price**:' + i.Price +  ' | **Armor: ** Front: ' + armorfront + ' | Sides: ' + armorsides + ' | Rear: ' + armorrear + ' | Top: ' + armortop)
  .setColor(color)


  .addField('**Category**', '**TAB**: ' + i.Tab + '| **Nationality**: ' + i.MotherCountry + ' | ' + proto)

  .addField('**Movement**', '**Type**: ' + i.MovementType + ' | **Offroad Speed**: ' + Math.trunc(i.MaxSpeed) + 'kph')

  .addField('**Availability**', i.RookieDeployableAmount + '/ ' + i.TrainedDeployableAmount + '/ ' + i.HardenedDeployableAmount + '/ ' + i.VeteranDeployableAmount + '/ ' + i.EliteDeployableAmount)

  .addField('**Weapon 1 ( ' + i.Weapon1Type + ')**', '**Weapon 1**: ' + i.Weapon1Name + ', ' + i.Weapon1Caliber + ' x' + Math.trunc(i.Weapon1DisplayedAmmunition) + ', **' + i.Weapon1Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon1RangeGround) + ' - ' + Math.trunc(i.Weapon1RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon1RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon1RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon1DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon1DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon1AP + ' | **HE Power**: ' + weapon1round + ' | **Salvo**: ' + Math.trunc(i.Weapon1ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon1SupplyCost) + ' per salvo | **ROF**: ' + weapon1rof, true);

//add fields for weapons only if the unit has the weapons

if(i.Weapon2Name !== '') {
    embed.addField('**Weapon 2 ( ' + i.Weapon2Type + ')**', weapon2);
}
if(i.Weapon3Name !== '') {
    embed.addField('**Weapon 3 ( ' + i.Weapon3Type + ')**', weapon3);
}
if(i.Tab === 'INF') {
  if(i.Weapon2Type == 'SAM') {
  embed.attachFiles(['./Pictures/Inf/manpads.png']);
   embed.setThumbnail('attachment://manpads.png');
} else if (i.Weapon2Type == 'ATGM') {
  embed.attachFiles(['./Pictures/Inf/atgms.png']);
   embed.setThumbnail('attachment://atgms.png');
} else if (i.Weapon2Type == 'LAW' && i.Weapon3Name === '') {
  embed.attachFiles(['./Pictures/Inf/fist.png']);
   embed.setThumbnail('attachment://fist.png');
} else if (i.Weapon2Type == 'Flamethrower') {
  embed.attachFiles(['./Pictures/Inf/flamers.png']);
   embed.setThumbnail('attachment://flamers.png');
} else if (i.Training == 'Regular' || i.Training == 'Militia') {
  embed.attachFiles(['./Pictures/Inf/lineinfantry.png']);
    embed.setThumbnail('attachment://lineinfantry.png');
} else if (i.Training == 'Shock') {
  embed.attachFiles(['./Pictures/Inf/lightinfantry.png']);
    embed.setThumbnail('attachment://lightinfantry.png');
  }
}
   if (i.Tab == 'LOG' && i.Training !== '') {
    embed.attachFiles(['./Pictures/Inf/command.png']);
     embed.setThumbnail('attachment://command.png');
   }
 if (i.Training == 'Elite') {
  embed.attachFiles(['./Pictures/Inf/commandos.png']);
    embed.setThumbnail('attachment://commandos.png');
}else if (i.Training !== 'Elite' && i.Training !== '' && i.Tab == 'REC') {
  embed.attachFiles(['./Pictures/Inf/recon.png']);
    embed.setThumbnail('attachment://recon.png');
}




return embed;
  };
