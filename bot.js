let cb1 = "308,67,316"
let cb2 = "308,67,308"
let cb3 = "308,67,300"
let cb4 = "308,67,292"
let cb5 = "308,67,284"
let cb6 = "308,67,276"
let cb7 = "308,67,268"
let cb8 = "308,67,260"
let cb9 = "308,67,252"
let cb10 = "308,67,244"
let cb11 = "313,67,239"
let cb12 = "321,67,239"
let cb13 = "329,67,239"
let cb14 = "337,67,239"
let cb15 = "342,67,244"
let cb16 = "342,67,252"
let cb17 = "342,67,260"
let cb18 = "342,67,268"
let cb19 = "342,67,276"
let cb20 = "342,67,284"
let cb21 = "342,67,292"
let cb22 = "342,67,300"
let nature = "317,67,321"
let evil = "325,67,321"
let extreme = "333,67,321"
let lava = "325,66,300"
let wasser = "325,66,260"
let event = "298,81,280"

const userData = {
    user: "deine-email@example.com", //Email
    userpw: "dein-passwort", //Passwort
    usercb: cb15, // Citybuild dem gejoint werden soll
    usergs: "/p h", //Grundstück auf das gegangen werden soll
    port: 3007, //Port für den Viewer. Bitte beachte, das es nicht 2x den selben gibt!
    userviewer: true, //Viewer [true = An | false = Aus]
    usercontrol: true, //Steuerung [true = An | false = Aus]
};

let switchingCityBuild = false;
const cbs = {cb1, cb2, cb3, cb4, cb5, cb6, cb7, cb8, cb9, cb10, cb11, cb12, cb13, cb14, cb15, cb16, cb17, cb18, cb19, cb20, cb21, cb22, nature, evil, extreme, event};

const mineflayer = require('mineflayer');
var vec3 = require('vec3');
const {pathfinder, Movements, goals} = require('mineflayer-pathfinder');
const readline = require('readline');

const bot = mineflayer.createBot({
    host: "griefergames.net",
    
    version: "1.13.2",
    username: userData.user, 
    password: userData.userpw, 
    auth: "microsoft",
})

function setupConsoleInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt('Warte auf befehl (!cmd for help): ');
    rl.prompt();

    const blockedCommands = ['!cmd', 'w', 'a', 's', 'd', 'q', 'e', 'j'];

    rl.on('line', (input) => {
        const trimmedInput = input.trim().toLowerCase();

        if (trimmedInput.startsWith('/switch ')) {
            const cbKey = trimmedInput.split(' ')[1];
            if (cbKey in cbs) {
                switchingCityBuild = true;
                bot.chat(`/switch ${cbKey}`);
                console.log(`Wechsel zu CityBuild: ${cbKey}`);
                setTimeout(() => { switchingCityBuild = false; }, 5000);
            } else {
                console.log(`Ungültiger CityBuild: ${cbKey}`);
            }
        } else {
            if (!blockedCommands.includes(trimmedInput)) {
                bot.chat(trimmedInput);
            }

            switch (trimmedInput) {
                case '!cmd':
                    console.log(" \n------------------ Commands ------------------\n[W] Der bot läuft nach vorne\n[A] Der bot läuft nach links\n[S] Der bot läuft nach hinten\n[D] Der bot läuft nach rechts\n[J] Der bot springt\n[Q] Der Bot dreht sich nach links\n[E] Der Bot dreht sich nach Rechts\n(Command) Gebe einen Command oder Text ein den der bot senden soll.\n------------------ Commands ------------------\n ");
                    break;
                case 'w':
                    moveBot('forward', 1);
                    break;
                case 'a':
                    moveBot('left', 1);
                    break;
                case 's':
                    moveBot('back', 1);
                    break;
                case 'd':
                    moveBot('right', 1);
                    break;
                case 'j':
                    jump();
                    break;
                case 'q':
                    turnBot('left');
                    break;
                case 'e':
                    turnBot('right');
                    break;
            }
        }
        rl.prompt();
    });

    rl.on('SIGINT', () => {
        bot.clearControlStates();
        process.exit(0);
    });
}

function moveBot(direction, distance) {
    switch (direction) {
        case 'forward':
            bot.setControlState('forward', true);
            break;
        case 'back':
            bot.setControlState('back', true);
            break;
        case 'left':
            bot.setControlState('left', true);
            break;
        case 'right':
            bot.setControlState('right', true);
            break;
        default:
            break;
    }

    setTimeout(() => {
        bot.clearControlStates();
    }, distance * 500);
}

function jump() {
    bot.setControlState('jump', true);
    setTimeout(() => {
        bot.clearControlStates();
    }, 500);
}

function turnBot(direction) {
    const currentYaw = bot.entity.yaw;
    const newYaw = direction === 'left' ? currentYaw - Math.PI / 2 : currentYaw + Math.PI / 2;
    bot.look(newYaw, 0, true);
}

bot.loadPlugin(pathfinder)

bot.on('kicked', async (reason, loggedIn) => {
    const kickReason = JSON.parse(reason).extra.map(item => item.text).join('');
    console.log(bot.username + ` wurde vom Server gekickt. Grund: ${kickReason}`);
    if (!loggedIn) {
        console.log('Der Bot war nicht eingeloggt.');
    }
    console.log("Warte 15 Minuten und Joine erneut...");
    await sleep(900000);
    startBot();
});

const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
bot.once(`spawn`, () => {
    startBot()
    console.log("Starte den Bot... ");
    if (userData.userviewer === true){
    mineflayerViewer(bot, { port: userData.port, firstPerson: true })
}})

async function startBot(){
    await sleep(5000)
    joinCB()
}

bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    if (!switchingCityBuild && message.includes("Lade Daten herunter!")) {
        joinGS();
    }      
});

function goto(x,y,z){
    const mcData = require('minecraft-data')(bot.version)
    const movements = new Movements(bot, mcData)
    movements.scafoldingBlocks = []
    bot.pathfinder.setMovements(movements)
    if (z){
        bot.pathfinder.setGoal(new goals.GoalBlock(x,y,z))
    }else {
        bot.pathfinder.setGoal(new goals.GoalBlock(x,y))
    }
}

async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function joinCB(){
    await sleep(1000)
    bot.chat('/portal')
    console.log("Betrete Portalraum...");
    await sleep(12000);
    const [x, y, z] = userData.usercb.split(',').map(Number);
    goto(x, y, z);
    console.log("Laufe zum gewählten Portal... (" + userData.usercb + ")");
}

async function joinGS(){
    bot.pathfinder.stop()
    await sleep(1000)
    bot.chat(userData.usergs)
    console.log("Teleportiere zum GS...");
    await sleep(700)
    console.log("Der Bot ist nun Online!")
    console.log("Version: 1.4")

    const networkInterfaces = require('os').networkInterfaces();
    let ipv4Address;

    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        for (const interface of interfaces) {
            if (interface.family === 'IPv4' && !interface.internal) {
                ipv4Address = interface.address;
                break;
            }
        }
        if (ipv4Address) break;
    }
    if (userData.userviewer === true){
        if (userData.usercontrol === false){
    console.log("--------------------------------------------------------")
    console.log("Viewer geladen: " + "http://" + ipv4Address + ":" + userData.port + " (strg + click)");
    console.log("--------------------------------------------------------")
    }}

    if (userData.usercontrol === true){
        if (userData.userviewer === true){
        console.log("--------------------------------------------------------")
        console.log("Anzeige: " + "http://" + ipv4Address + ":" + userData.port + " (strg + click)")
        console.log("--------------------------------------------------------")
        setupConsoleInput();
        }else{
        console.log("--------------------------------------------------------")
        console.log("Bitte Aktiviere den Viewer!")
        console.log("--------------------------------------------------------")
        }
    }
}


// - Sch-Server 1.4 upgrade
// - Mabus haupt 1.4
// - 
// - 
// - 