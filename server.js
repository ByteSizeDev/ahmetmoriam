require('dotenv').config();

const tmi = require('tmi.js');

const regexptvm = new RegExp(/.*t[uü]rk\s+var\s*m[ıi].*/)

const responses = [`var olm yeter sormayın artık`,
                   `var türk mnkym var`,
                   `var olm sorup durmayın`, //+ mkFlag(2),
                   `var niye lazim sana türk bulup napıcan `, //+ mkFlag(2),
                   `türk var kardeşim, nargile mi içmek istiyorsun beraber `, //+ mkFlag(3),
                   `türk var kardeşim, madem türk'sün göster ürksün `, //+ mkFlag(5),
                   `var kardeşi̇m otağı nereye kuruyoruz yer göster `, //+ mkFlag(5),
                   ` var kardeşim, VER MEHTERİ CcC `, //+ mkFlag(5),
                   `türk olmaz olur mu kardeşim her yerde türk var!`, //+ mkFlag(1),
                   `bütün dünya dolaylı olarak türk olduğu için TÜRK VAR evet`,
                   `bütün dünya dolaylı olarak türk olduğu için TÜRK VAR evet`, //+ mkFlag(1) + ` `,
                   `türk var hatta GÖKTÜRK bile var lan cCc`, //+ mkFlag(1),
                   `"türk varmı diye sorulmadığı gün muhasız medeniyetler seviyesine erişmiş olacağız." --K.Atatürk`,
                   `"Beni chatte TÜRK VARMI diye soranlara emanet ediniz." - Kemal Ataturk`,
                   `Türk yok kardeşim burda bütün Türkiye'ye nükleer bomba atılmış bi Türk sen kalmışsın.`, //+ mkFlag(2),
                   `Türk yok ama GÖK TÜRK var, o olur mu?`, //+ mkFlag(4),
                   `Türk yok ama ANADOLU SELÇUKLU var, o kurtarir mi?`]

const max = responses.length;

function getRand(max) {
    return Math.floor(Math.random() * max);
}

function turkVarMiReact() {
    return responses[getRand(max)]
}

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

client.on('message', (channel, tags, message, self) => {
    const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME;

    if ( !isNotBot ) return;

    const raw = message.toLowerCase().match(regexptvm);
  
    if ( raw ) {
        const resp = turkVarMiReact();
        client.say(channel, `@${tags.username} ${resp}`);
    }

    console.log(`${tags['display-name']}: ${message}`);
  
});
