const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");


client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	client.user.setActivity(`${client.guilds.size} servers! le!help`, {type: 'Watching'});
	setInterval(() => {
		client.user.setActivity(`${client.guilds.size} guilds! | use t!help`, {type:"WATCHING"})
    	setTimeout(() => {
  		client.user.setActivity(`${client.guilds.reduce((a, g) => a + g.memberCount, 0)} users! | use t!help`, {type:"WATCHING"})
	}, 3000);
}, 6000);
	//const channel = client.channels.get('458252935172849688');
	//if (!channel) return;
	//channel.send("Hi");
});

client.on("message", async message => {
	if (message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command == "ping") {
		const m = await message.channel.send("Calculating...");
		const embed = {
			author: {
				name: `?? Latency!`,
				icon_url: client.user.avatarURL
			},
			description: `Pong! :ping_pong: \nLatency is **${m.createdTimestamp - message.createdTimestamp}**ms.\nAPI Latency is **${Math.round(client.ping)}**ms.`,
			color: 569815,
      		timestamp: new Date()
		};
		m.edit({embed});
	}
	
	if (command == "help") {
		const embed = {
			description: "I'm sorry but the bot is under a big maintenace!\n\n__**Reasons:**__\n**1**- Moving the bot to a host!\n**2**- Recoding the bot to another language!\n**3**- Changing between databases!\n\n__**Expected Time:**__\nNo time estimated!",
			color: 569815,
      		timestamp: new Date()
		};
		await message.channel.send({embed});
	}

	if (command == "guilds") {
		if (message.author.id == "197340056053219329") {
			message.channel.send("a");
		} else {
			message.channel.send("b");
		}
	}

});

client.login(process.env.TOKEN);
