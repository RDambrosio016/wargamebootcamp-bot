const Discord = require('discord.js');


module.exports.help = (args, message) => {
  const filter = (reaction, user, member) => {
    return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  message.reply(" **!info** - Displays info about the bot, code, and Acknowledgements \n **!git <unit>** - Displays the full stats of any units with the matching name \n **!gitpm <unit>** - Same as git but sends the results through pm \n **!gitspec <unit>** - Same as git but requires a specific unit name \n **!list <unit>** - Lists all matching units \n **!ke <armor value>** - Displays a table of ke damage values for that armor value \n **!heat <armor value>** - Displays a table of HEAT damage for that armor value \n **!<map>** - Displays a map of a ranked map \n **!rookie** - Gives you the rookie role \n **!lfg** - Adds you to the looking for game pool \n **!unspecguide** - A beginner deck building guide \n **!specprimer** - A primer to spec decks and how to counter them \n **!honguide** - A beginner's guide to wargame \n **!razzguide** - Razzmann's video wargame guides \n **!keyvalues** - Values worth remembering  \n **!armorytool** - A tool for viewing hidden unit stats \n **!replayfolder** - Folder Where game replays are stored \n **!rof** - A Rate of Fire cheatsheet \n **!bling** - How to get colors and tags in wargame \n **!progression** - Reccomended progression guide for beginners\n **!rankedmaps** - List of maps in the ranked pool \n\n **For any bugs or questions, pm senorDickweed#7033**").then(m => {

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


module.exports.botcommands = () => { 
  
  client.channels.get("506955344996597771").bulkDelete(1);
  client.channels.get("506955344996597771").send(" **!info** - Displays info about the bot, code, and Acknowledgements \n **!git <unit>** - Displays the full stats of any units with the matching name \n **!gitpm <unit>** - Same as git but sends the results through pm \n **!gitspec <unit>** - Same as git but requires a specific unit name \n **!list <unit>** - Lists all matching units \n **!ke <armor value>** - Displays a table of ke damage values for that armor value \n **!heat <armor value>** - Displays a table of HEAT damage for that armor value \n **!<map>** - Displays a map of a ranked map \n **!rookie** - Gives you the rookie role \n **!lfg** - Adds you to the looking for game pool \n **!unspecguide** - A beginner deck building guide \n **!specprimer** - A primer to spec decks and how to counter them \n **!honguide** - A beginner's guide to wargame \n **!razzguide** - Razzmann's video wargame guides \n **!keyvalues** - Values worth remembering  \n **!armorytool** - A tool for viewing hidden unit stats \n **!replayfolder** - Folder Where game replays are stored \n **!rof** - A Rate of Fire cheatsheet \n **!bling** - How to get colors and tags in wargame \n **!progression** - Reccomended progression guide for beginners\n **!rankedmaps** - List of maps in the ranked pool \n\n **For any bugs or questions, pm senorDickweed#7033**");
};
