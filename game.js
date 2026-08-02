alert("GAME.JS LOADED");
const sceneText = document.getElementById("sceneText");
const choices = document.getElementById("choices");


function showScene(text, options){

    sceneText.innerHTML = text;

    choices.innerHTML="";

    options.forEach(option=>{

        let button=document.createElement("button");

        button.innerHTML=option.text;

        button.onclick=option.action;

        choices.appendChild(button);

    });

    updateBudget();

}



// -------------------------
// MODCOD DATABASE
// -------------------------

const modcods = [

{
name:"BPSK 1/2",
requiredEbNo:3,
efficiency:.5
},

{
name:"QPSK 3/4",
requiredEbNo:5,
efficiency:1.5
},

{
name:"16APSK 3/4",
requiredEbNo:8,
efficiency:3
},

{
name:"64APSK 5/6",
requiredEbNo:12,
efficiency:5
}

];



// -------------------------
// START
// -------------------------

showScene(`

<h2>YEAR 2097</h2>

Deep in the outer solar system, the greatest achievement
of human engineering has fallen silent.

Satellite <b>METAL-X9</b> was transmitting the largest
heavy metal concert ever broadcast.

Then the signal disappeared.

Earth's musicians have gone silent.

Guitarists stare into the darkness.

Scientists have been forced to listen to elevator music.

The satellite is alive.

The RF link is not.

Your mission:

<b>Design a deep-space communications link budget
and restore the signal.</b>

Required:

<br><br>

Data Rate: 3 Mbps

Target Link Margin: +3 dB

<br><br>

Can you save humanity's metal?

`,
[
{
text:"ACCEPT MISSION 🤘",
action:frequencyScene
}
]);





// -------------------------
// FREQUENCY
// -------------------------

function frequencyScene(){

showScene(`

<h2>STEP 1: FREQUENCY SELECTION</h2>

The satellite engineer looks worried.

"Commander, frequency choice determines everything."

Higher frequencies provide bandwidth but suffer more
atmospheric loss.

Choose the communications band:

`,
[

{
text:"S-band (2.2 GHz)",
action:function(){

link.frequencyGHz=2.2;

link.txGainDbi=28;

frequencyDone();

}
},

{
text:"X-band (8.4 GHz)",
action:function(){

link.frequencyGHz=8.4;

link.txGainDbi=35;

frequencyDone();

}
},

{
text:"Ka-band (32 GHz)",
action:function(){

link.frequencyGHz=32;

link.txGainDbi=42;

frequencyDone();

}
}

]);

}



function frequencyDone(){

showScene(`

Good choice.

RF TIP:

Higher frequency means:

+ More bandwidth

- More path loss

- More rain fade

The universe is big.
Radio waves have a difficult commute.

`,
[
{
text:"Continue",
action:powerScene
}
]);

}



// -------------------------
// POWER
// -------------------------

function powerScene(){

showScene(`

<h2>STEP 2: TRANSMITTER POWER</h2>

The satellite has limited electrical power.

More watts means a stronger signal,
but also more heat.

Choose the amplifier:

`,
[

{
text:"50 W amplifier",
action:function(){

link.txPowerW=50;
powerDone();

}
},

{
text:"250 W amplifier",
action:function(){

link.txPowerW=250;
powerDone();

}
},

{
text:"500 W amplifier",
action:function(){

link.txPowerW=500;
powerDone();

}
}

]);

}


function powerDone(){

showScene(`

Transmitter configured.

Remember:

Power is converted logarithmically.

A 10x increase in power gives only
+10 dB.

`,
[
{
text:"Choose antenna",
action:antennaScene
}
]);

}



// -------------------------
// ANTENNA
// -------------------------

function antennaScene(){

showScene(`

<h2>STEP 3: TRANSMIT ANTENNA</h2>

Antenna gain focuses energy.

Would you rather shout louder,
or point a megaphone directly at Earth?

Choose:

`,
[

{
text:"Small antenna - 20 dBi",
action:function(){

link.txGainDbi=20;
antennaDone();

}
},

{
text:"Deep space dish - 42 dBi",
action:function(){

link.txGainDbi=42;
antennaDone();

}
}

]);

}



function antennaDone(){

showScene(`

Antenna selected.

EIRP is now calculated:

<b>EIRP = TX Power + Antenna Gain - Losses</b>

`,
[
{
text:"Continue",
action:bandwidthScene
}
]);

}



// -------------------------
// BANDWIDTH
// -------------------------

function bandwidthScene(){

showScene(`

<h2>STEP 4: TRANSMITTER BANDWIDTH</h2>

The band manager asks:

"How much heavy metal can you push through the pipe?"

Remember:

More bandwidth means more noise.

Choose:

`,
[

{
text:"100 kHz",
action:function(){

link.bandwidthHz=100000;
bandwidthDone();

}
},

{
text:"1 MHz",
action:function(){

link.bandwidthHz=1000000;
bandwidthDone();

}
},

{
text:"10 MHz",
action:function(){

link.bandwidthHz=10000000;
bandwidthDone();

}
}

]);

}



function bandwidthDone(){

showScene(`

Bandwidth selected.

RF TIP:

Noise increases with bandwidth.

A wider highway is useless
if the signal is buried in noise.

`,
[
{
text:"Select MODCOD",
action:modcodScene
}
]);

}



// -------------------------
// MODCOD
// -------------------------

function modcodScene(){

showScene(`

<h2>STEP 5: MODCOD SELECTION</h2>

The satellite asks:

"How aggressive do you want to be?"

Higher modulation gives higher data rates,
but requires cleaner signals.

`,
[

{
text:"BPSK 1/2 (safe)",
action:function(){

link.modcod=modcods[0];

modcodDone();

}
},

{
text:"QPSK 3/4",
action:function(){

link.modcod=modcods[1];

modcodDone();

}
},

{
text:"64APSK 5/6 (metal speed mode)",
action:function(){

link.modcod=modcods[3];

modcodDone();

}
}

]);

}


function modcodDone(){

showScene(`

MODCOD locked.

The satellite now knows how many bits
it can squeeze through each symbol.

`,
[
{
text:"Configure receiver",
action:receiverScene
}
]);

}



// -------------------------
// RECEIVER
// -------------------------

function receiverScene(){

showScene(`

<h2>STEP 6: RECEIVER G/T</h2>

Earth needs to hear a whisper
from billions of kilometers away.

Choose ground station:

`,
[

{
text:"Small dish G/T = 25 dB/K",
action:function(){

link.rxGainDbi=50;

receiverDone();

}
},

{
text:"Deep Space Network G/T = 55 dB/K",
action:function(){

link.rxGainDbi=85;

receiverDone();

}
}

]);

}


function receiverDone(){

showScene(`

Receiver configured.

G/T is the
