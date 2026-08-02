let progress = 0;

const story = document.getElementById("story");
const choices = document.getElementById("choices");
const score = document.getElementById("progress");

function scene(text, buttons) {

    story.innerHTML = text;
    choices.innerHTML = "";

    buttons.forEach(b=>{
        let btn=document.createElement("button");
        btn.innerHTML=b.text;
        btn.onclick=b.action;
        choices.appendChild(btn);
    });
}


scene(
`
YEAR 2097...

Deep beyond Mars, a lonely satellite named <b>METAL-X9</b>
was broadcasting the greatest heavy metal playlist ever assembled.

Scientists called it:
<br><br>
"THE GALACTIC RIFF TRANSMITTER."

Then disaster struck.

The signal vanished.

Earth has gone silent.

Millions of guitarists stare sadly at their instruments.
Headbangers have been forced to listen to elevator music.

The only person capable of restoring the link...

is YOU.

Your mission:
Build an RF link budget and reconnect humanity with the crushing power of deep-space metal.
`,
[
{
text:"ACCEPT THE CHALLENGE",
action:accept
},
{
text:"Reject mission",
action:reject
}
]);


function reject(){

scene(
`
You walk away.

The universe grows quiet.

A single tear falls from a guitarist's eye.

The last words transmitted from METAL-X9 were:

<br><br>
<b>"Whimp."</b>
`,
[]);
}


function accept(){

scene(
`
Excellent choice, Commander.

Your ancient engineering terminal boots up.

Step 1:
Determine the transmitted power.

METAL-X9 has a power amplifier.

How much RF power should we transmit?

<br><br>
(Warning: choosing "maximum power" may annoy the satellite neighbors.)
`,
[
{
text:"1 watt",
action:()=>wrong("The signal barely reaches the satellite antenna. The aliens mistake it for a microwave oven.")
},
{
text:"100 watts",
action:()=>correct("Good. Enough power to rock the solar system.")
},
{
text:"1 gigawatt",
action:()=>wrong("You accidentally create the world's most expensive space toaster.")
}
]);
}


function correct(msg){

progress++;
score.innerHTML=progress;

scene(
msg+
`
<br><br>
Link budget step complete.
`,
[
{
text:"Continue",
action:nextStep
}
]);

}


function wrong(msg){

scene(
msg+
`
<br><br>
Engineering note:
Try again, Commander.
`,
[
{
text:"Retry",
action:accept
}
]);

}


function nextStep(){

if(progress===1){

scene(
`
Step 2:
Choose the antenna gain.

Deep space requires a focused beam.

What antenna do we use?
`,
[
{
text:"High gain dish antenna",
action:()=>correct("Excellent. The dish focuses RF energy like a laser made of radio waves.")
},
{
text:"A car antenna",
action:()=>wrong("The satellite receives a request to play heavy metal... from someone's garage.")
}
]);

}

else if(progress===2){

scene(
`
Step 3:
Calculate free-space path loss.

The signal must travel millions of kilometers.

What happens to signal strength over distance?
`,
[
{
text:"It gets weaker",
action:()=>correct("Correct. Space is very rude to radio waves.")
},
{
text:"It gets louder",
action:()=>wrong("Unfortunately physics does not work that way.")
}
]);

}

else if(progress===3){

scene(
`
Step 4:
Select the receiver.

Earth needs a sensitive antenna system.

Choose:
`,
[
{
text:"Large radio telescope",
action:()=>correct("Perfect. Humanity dusts off the giant antennas.")
},
{
text:"A phone held toward the sky",
action:()=>wrong("The phone says: 'Searching...' forever.")
}
]);

}

else if(progress===4){

scene(
`
Final step:
Account for link margin.

Engineers always leave extra room.

Why?
`,
[
{
text:"Because reality enjoys ruining calculations",
action:()=>victory()
},
{
text:"Because math is optional",
action:()=>wrong("The satellite engineers are disappointed.")
}
]);

}

}


function victory(){

progress=5;
score.innerHTML=5;

scene(
`
MISSION COMPLETE.

Your RF link budget is flawless.

The deep-space antenna locks onto METAL-X9.

A carrier appears...

The signal returns.

<br><br>

🌎 Earth receives the transmission.

Across the planet:

🤘 Humans headbang.

🤘 Scientists air-guitar.

🤘 Even the satellites start vibrating.

<br><br>

The galaxy hears the greatest heavy metal concert ever broadcast.

Your name is remembered forever as:

<br>
<b>THE ENGINEER WHO SAVED ROCK.</b>
`,
[]);
}
