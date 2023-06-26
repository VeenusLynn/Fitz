const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Provides information about (user / server).")
    .addSubcommand(subcommand =>
      subcommand
        .setName("user")
        .setDescription("Provides information about the user running the command.")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("server")
        .setDescription("Provides information about this server.")
    ),
  async execute(interaction) {
    
      // If the subcommand is "user", then reply with the user's information.
      // If the subcommand is "server", then reply with the server's information.
      // If the subcommand is neither, then reply with an error message.
      // Hint: interaction.options.getSubcommand()
      // Hint: interaction.user
      // Hint: interaction.guild
      // Hint: interaction.reply()
      // Hint: interaction.reply({ embeds: [embed] })
      // Hint: interaction.reply({ content: "Error: Invalid subcommand.", ephemeral: true })
      // Hint: interaction.reply({ content: "Error: Invalid subcommand.", ephemeral: true, embeds: [embed] })
      
      if (interaction.options.getSubcommand() == "user" ){

        await interaction.reply(`User: ${interaction.user} \n Username: ${interaction.user.username} \n Avatar: ${c()}`);

      } else if (interaction.options.getSubcommand() == "server") {

        await interaction.reply({content: `Server Name: ${interaction.guild.name} \n Server Owner: ${interaction.guild.owner} \n Server Region: ${interaction.guild.region} \n Server Verification Level: ${interaction.guild.verificationLevel} \n Server Member Count: ${interaction.guild.memberCount} \n Server Created At: ${interaction.guild.createdAt} \n Server Icon: ${interaction.guild.iconURL()}`,ephemeral: true});

      } else {

        await interaction.reply({ content: "Error: Invalid subcommand.", ephemeral: true, embeds: [embed] });

      }
      
      
  },
};
