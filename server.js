const Discord = require("discord.js"); //Discord modulu;
const client = new Discord.Client({ disableEveryone: true });
const info = require("./information.json");

client.on("ready", () => {
  client.user.setGame("Selamlar"); // Bot oynuyor yazısı
});

client.on("message", message => {
  if (message.author.bot) return; //Eğer mesajın sahibi botsa takma
  if (message.author.id == client.user.id) return; //Eğer mesajın sahibi bensem gene takma
  let prefix = info.prefix;
  if (message.content.startsWith(prefix)) {
    // Eğer mesajın içeriği prefixle başlıyorsa
    //Parantezin içindekileri yapacak
    let commandName = message.content.split(prefix)[1].split(" ")[0]; // Komutun adını alır
    let args = message.content
      .split(prefix)[1]
      .split(" ")
      .slice(1); // Komutun yanındakileri alır

    switch (commandName) {
      default:
        message.channel.send(
          commandName +
            " adlı komut bulunamadı. b!yardım yazarak butun komutları görebilirsin."
        );
        break;
      case "yardım":
        message.channel.send(
          "Butun komutlar : " + prefix + "yardım, " + prefix + "temizle"
        );
        break;

      case "temizle":
        if (!args[0] || isNaN(args[0]) || args[0] > 99 || args[0] < 1)
          return message.channel.send(
            "1 le 100 arası silincek bir değer girmelisin."
          );
        message.channel
          .bulkDelete(args[0])
          .then(() => {
            // Toplu mesaj siler.
            message.channel.send(
              "Başarıyla `" + args[0] + "` kadar mesaj silindi."
            );
          })
          .catch(err => {
            return message.channel.send("Botun yetkisi yok mal");
          });
        break;
    }
  }
});

client
  .login(info.token)
  .then(() => {
    console.log(
      "[Başarıyla] : Giriş yaptım hesabımın adı  " + client.user.username
    );
  })
  .catch(err => {
    console.error("Err : " + err);
  });

