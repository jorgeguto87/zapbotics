const qrcode = require ('qrcode-terminal');
const {Client, LocalAuth, List, Buttons, MessageTypes, MessageMedia} = require ('whatsapp-web.js');
const client = new Client ({
    authStrategy: new LocalAuth()

});

const cron = require('node-cron');
const fs = require ('fs');

const grupos = [
    '120363039621149962@g.us', 
    '5521992884522-1634652354@g.us',
    '120363045569895184@g.us',
    '120363143030407637@g.us',
    '120363029538805156@g.us',
    '120363049713481319@g.us' ];

    const horarios = [
        11,14,17,21,23
    ];

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    client.on('ready', () => {
        console.log('E lá vamos nós');
    });

    client.initialize();

    function hora(){
        const data = new Date();
        const hora = data.getHours();
        let str = '';
        if (hora >= 5 && hora < 12){
            str = '*Bom dia!*';
        }else if (hora >= 12 && hora < 18){
            str = '*Boa tarde!*';
        }else{
            str = '*Boa noite!*';
        }
        return str;
    };

    function atende(){
        const data = new Date();
        const hora = data.getHours();
        let str = '';
        if (hora >= 8 && hora < 20){
            str = '😃 *Aguarde um momento que logo será atendido!*';
        }else{
            str = '😕 *Poxa, já estamos fora do horário de atendimento!*\n\n😃 Mas não fique triste, assim que retomarmos nossas atividades, falar com você será nossa prioridade.\n\n\🕗 _Nosso horário de atendimento é de segunda a sábado das 08:00hs às 20:00hs._\n\n👋 *Até mais!*';
        }
        return str;

    };

    function domingo(){
        const data = new Date();
        const dia = data.getDay();
        let str = '';
        if (dia === 0){
            str = '🏖️ *Aproveite o fime de semana!*\n\n😉 Segunda feira nos falamos assim que retomarmos nossas atividades.\n\n🕗 _Nosso horário de atendimento é de segunda a sábado das 08:00hs às 20:00hs._\n\n👋 *Até mais!*';
        } else {
            str = atende();
        }
        return str;
    };
const data = new Date();
const horaatual = data.getHours();
const diaatual = data.getDay();



    const delay = ms => new Promise(res => setTimeout(res, ms));

    client.on('message', async msg => {
        cron.schedule('* * * * *', async () => {
    if (diaatual >= 1 && diaatual <= 6 && horarios.includes(horaatual)){
        const anuncio = MessageMedia.fromFilePath('./anuncio.jpg');
        const mensagem = 'Saiba mais clicando no *LINK ABAIXO!* 👇\nhttps://api.whatsapp.com/send?phone=+5521999363578&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20CHATBOT';

        for(const grupo of grupos) {
            try {
                await client.sendMessage(grupo, anuncio, {caption: mensagem});
                console.log(`Mensagem enviada para o grupo: ${grupo}`);
            } catch (error) {
                console.error(`Erro ao enviar mensagem para o grupo: ${grupo}`, error);
            }
        }
    }
});
        if (msg.body.match (/(Bot)/i) && msg.from.endsWith('@c.us')){
            const chat = await msg.getChat();
            const contact = await msg.getContact();
            const nome = contact.pushname;
            const logo = MessageMedia.fromFilePath('./LOGO.jpg');
            await delay(3000);
            await chat.sendStateTyping();
            await delay (3000);
            await client.sendMessage(msg.from, logo, {caption:'🙋‍♂️ *Olá* ' + nome.split(' ')[0] + '! ' + hora() + '\nSou o 🤖 *Zaapy,* atendente virtual da *ZAP Botics.*\n_Como posso ajudar?_\n\nEscolha o *NÚMERO* de uma das opções abaixo. 👇\n\n1️⃣ - Preciso de um *CHATBOT*\n2️⃣ - O que é um *CHATBOT?*\n3️⃣ - Acompanhar projeto\n4️⃣ - Assistência técnica 24hs'});
        }; 
        if (msg.body === "1") {
            const chat = await msg.getChat();
            await delay (3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😃 *Maravilha!*\n\nQual é a modalidade da sua empresa?');
            await delay (10000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😉 *Vou te explicar os próximos passos.*\n\n➡️ Primeiro vamos criar um fluxo de atendimento pra o seu *CHATBOT* junto a você.\n\n➡️ Fluxo criado, vamos partir para a fase de desenvolvimento, este processo é bastante trabalhoso e pode levar até duas semanas dependendo do seu fluxo de atendimento.\n\n➡️ Após este processo vamos começar os testes para sua aprovação.\n\n➡️ *CHATBOT* aprovado, iremos implantar em um servidor virtual para que escaneie o *QRCODE* e pronto. *BOT* 🤖 em funcionamento!');
            await delay (10000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, 'Viu como é simples?\n\nO pagamento será feito após a sua aprovação na fase de testes.');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, 'Falando em pagamentos...\nQual foi a opção que mais te interessou?\n\n5️⃣ - R$499,00 em 6x s/Juros\n6️⃣ - R$399,00 no PIX'); 



        }else if (msg.body === "5") {
            const chat = await msg.getChat();
            const contact = await msg.getContact();
            const nome = contact.pushname;
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😉 Perfeito ' + nome.split(' ')[0] + '!' + '\n\nNós facilitamos para você o pagamento do seu *CHATBOT* em 6x sem juros no cartão de crédito.');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😎 Você terá direito a 1 ano livre de mensalidades!\n\nApós este período haverá uma mensalidade de R$49,99 para a manutenção dos servidores.\n\nNão há limite de mensagens, o uso do seu *CHATBOT* sempre será ilimitado e com assistência 24hs.');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, 'Vou direcionar você para o profissional que irá te explicar melhor e dar seguimento nos próximos passos!');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, domingo());

        }else if (msg.body === "6") {
            const chat = await msg.getChat();
            const contact = await msg.getContact();
            const nome = contact.pushname;
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😉 Perfeito ' + nome.split(' ')[0] + '!' + '\n\nDesconto é sempre bom, e reservamos este super desconto para você.');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😎 Você terá direito a 1 ano livre de mensalidades!\n\nApós este período haverá uma mensalidade de R$49,99 para a manutenção dos servidores.\n\nNão há limite de mensagens, o uso do seu *CHATBOT* sempre será ilimitado e com assistência 24hs.');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, 'Vou direcionar você para o profissional que irá te explicar melhor e dar seguimento nos próximos passos!');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, domingo());

        }else if (msg.body === "2") {
            const chat = await msg.getChat();
            const audio = MessageMedia.fromFilePath('./audio_bot_um.mp3');
            await delay(3000);
            await chat.sendStateRecording();
            await delay(5000);
            await client.sendMessage(msg.from, audio, {sendAudioAsVoice:true});
            await delay(30000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '*Resumindo:*\n_Em resumo, o *CHATBOT* 🤖 para WhatsApp é uma solução eficiente para automatizar a comunicação em larga escala, melhorando a experiência do usuário e tornando o atendimento mais rápido e acessível._');
            await delay(10000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😉 *Gostou?*\n\nO que deseja fazer agora?\n\n1️⃣ - Preciso de um *CHATBOT*\n0️⃣ - Sair');

        }else if (msg.body === "0"){
            const chat = await msg.getChat();
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😉 *Até mais!*');

        }else if(msg.body === "3"){
            const chat = await msg.getChat();
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😃 *Maravilha!*\n\nVou pedir para que digite o nome da sua empresa enquanto aguarda o atendimento.');
            await delay(10000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, domingo());

        }else if(msg.body === "4"){
            const chat = await msg.getChat();
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😉 *Correto!*\n\nDigite o nome da sua empresa por favor:');
            await delay(10000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, 'A assistência que você precisa, trata-se de uma emergência para tendimento 24hs?\n\n#️⃣ - *SIM* 🚨\n9️⃣ - *NÃO*');

        }else if(msg.body === "#") {
            const chat = await msg.getChat();
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '*Não se preocupe!*\n\nIremos cuidar do seu problema o quanto antes.');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, 'Vou pedir para que nos envie um áudio relatando o problema apresentado enquanto aguarda o seu atendimento. Ok?');

        }else if(msg.body === "9") {
            const chat = await msg.getChat();
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, '😉 *Ok!*');
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, 'Vou pedir para que nos envie um áudio relatando o problema apresentado enquanto aguarda o seu atendimento. Ok?');
            await delay(60000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, domingo());

        };
        
    });
    
