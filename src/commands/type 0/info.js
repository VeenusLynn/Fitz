const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Provides information about (user / server).")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Provides information about the user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to provide information about.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Provides information about this server.")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() == "user") {
      const memeberTarget = interaction.options.getMember("target");
      const target = interaction.options.getUser("target");
      const targetAvatar = target.displayAvatarURL();

      const userEmbed = new EmbedBuilder()
        .setTitle(`${target.username}'s info:`)
        .setColor(0x0099ff)
        .setTimestamp()
        .setImage(`${targetAvatar}`)
        .addFields(
          { name: `User tag : `, value: `${target.tag}` },

          { name: `joined Discord at: `, value: `${target.createdAt}` },
          {
            name: `joined *_${interaction.guild.name}_* at: `,
            value: `${memeberTarget.joinedAt}`,
          }
        );

      const button = new ButtonBuilder()
        .setLabel("Avatar link")
        .setStyle(ButtonStyle.Link)
        .setURL(target.avatarURL());

      const row = new ActionRowBuilder().addComponents(button);

      await interaction.reply({ embeds: [userEmbed], components: [row] });
    } else if (interaction.options.getSubcommand() == "server") {
      const owner = await interaction.guild.fetchOwner();

      const serverEmbed = new EmbedBuilder()
        .setTitle("Server info : ")
        .setTimestamp()
        .setColor(0x0099ff)
        .addFields(
          { name: "Server Name: ", value: `**${interaction.guild.name}**  ` },
          { name: `Server Owner: `, value: `${owner}  ` },
          {
            name: "Server Member Count: ",
            value: `**${interaction.guild.memberCount}**  `,
          },
          {
            name: "Server Created At: ",
            value: `**${interaction.guild.createdAt}**  `,
          }
        )
        .setImage(`${interaction.guild.iconURL()}`);

      const button = new ButtonBuilder()
        .setLabel("Server Icon link")
        .setStyle(ButtonStyle.Link)
        .setURL(`${interaction.guild.iconURL()}`);

      const row = new ActionRowBuilder().addComponents(button);

      await interaction.reply({ embeds: [serverEmbed], components: [row] });
    } else {
      await interaction.reply({
        content: "Error: Invalid subcommand.",
        ephemeral: true,
      });
    }
  },
};
