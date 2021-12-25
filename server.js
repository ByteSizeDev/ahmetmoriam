require('dotenv').config();

const tmi = require('tmi.js');

const regextvm = new RegExp(/.*t[uü]rk\s*var\s*m[ıi].*/);

const minWait = 2500;
const maxWait = 10000;

const responses = [`var olm yeter sormayın artık`,
                  `var türk mnkym var`,
                  `var olm sorup durmayın` + addFlags(2),
                  `var niye lazim sana türk bulup napıcan ` + addFlags(2),
                  `türk var kardeşim, nargile mi içmek istiyorsun beraber ` + addFlags(3),
                  `türk var kardeşim, madem türk'sün göster ürksün ` + addFlags(5),
                  `var kardeşi̇m otağı nereye kuruyoruz yer göster ` + addFlags(5),
                  addFlags(5) + ` var kardeşim, VER MEHTERİ CcC ` + addFlags(5),
                  `türk olmaz olur mu kardeşim her yerde türk var!` + addFlags(1),
                  `bütün dünya dolaylı olarak türk olduğu için TÜRK VAR evet`,
                  `bütün dünya dolaylı olarak türk` + addFlags(1) + ` olduğu için TÜRK VAR evet`,
                  `türk var hatta GÖKTÜRK bile var lan cCc` + addFlags(1),
                  `"türk varmı diye sorulmadığı gün muhasız medeniyetler seviyesine erişmiş olacağız." --K. Atatürk`,
                  `"Beni chatte TÜRK VARMI diye soranlara emanet ediniz." - Kemal Ataturk`,
                  `Türk yok kardeşim burda bütün Türkiye'ye nükleer bomba atılmış bi Türk sen kalmışsın.` + addFlags(2),
                  `Türk yok ama GÖK TÜRK var, o olur mu?` + addFlags(4),
                  `Türk yok ama ANADOLU SELÇUKLU var, o kurtarir mi?`]

// reduce

const max = responses.length;

function getRand(max) {
    return Math.floor(Math.random() * max);
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function turkVarMiReact() {
    return responses[getRand(max)]
}

/////////////////////////////////////////////////////////

function addFlags(count) {
    var fc = getRand(count);
    var fs = "";
    for (let i = 1; i <= fc; i++) {
      fs = fs + '🇹🇷';
    }
    return fs;
}

/////////////////////////////////////////////////////////

const client = new tmi.Client({
    connection: { 
        reconnect: true 
    },
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [ 'bytesized_' ]
});

client.connect();

//message on connection
client.on("join", (channel, username, self) => {
    client.say(channel, "Selam! Sohbet nasıl")
});

client.on('message', (channel, tags, message, self) => {
    //const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME;

    if ( self ) return;

    const raw = message.toLowerCase().match(regextvm);
  
    if ( raw ) {
        const resp = turkVarMiReact();
        /////////////////////////////////////////////////////////

        const delay = getRandomDelay(minWait, maxWait);

        //setTimeout(() => { client.say(channel, `@${tags.username} ${resp}`); }, delay);

        client.say(channel, `@${tags.username} ${resp}`);

        /////////////////////////////////////////////////////////
    }

    console.log(`${tags['display-name']}: ${message}`);
  
});
