// METAL-X9 RF LINK BUDGET CALCULATOR
// Deep Space Heavy Metal Communications Simulator


const link = {

    // Mission parameters
    frequencyGHz: 32,
    distanceKm: 360000000,

    // Transmitter
    txPowerW: 250,
    txGainDbi: 42,
    txLossDb: 1,

    // Propagation
    rainFadeDb: 0,
    pointingLossDb: 0,

    // Receiver
    rxGainDbi: 74,
    systemTemperatureK: 100,

    // Modulation
    bandwidthHz: 1000000,
    dataRateBps: 3000000,

    modcod: {
        name:"QPSK 3/4",
        requiredEbNo:5,
        efficiency:1.5
    }

};



// Convert watts to dBW
function wattsToDbw(watts){

    return 10*Math.log10(watts);

}



// Antenna gain
function calculateGain(diameter, frequencyGHz, efficiency){

    let wavelength =
        0.3 / frequencyGHz;

    let gain =
        efficiency *
        Math.pow(
            Math.PI * diameter / wavelength,
            2
        );

    return 10*Math.log10(gain);

}



// EIRP calculation
function calculateEIRP(){

    let powerDbw =
        wattsToDbw(link.txPowerW);


    return (
        powerDbw
        +
        link.txGainDbi
        -
        link.txLossDb
    );

}



// Free Space Path Loss
function calculateFSPL(){

    return (
        92.45
        +
        20*Math.log10(link.frequencyGHz)
        +
        20*Math.log10(
            link.distanceKm
        )
    );

}



// Noise power

function calculateNoise(){

    // Boltzmann constant
    // -228.6 dBW/K/Hz

    let noiseDbw =
        -228.6
        +
        10*Math.log10(
            link.systemTemperatureK
        )
        +
        10*Math.log10(
            link.bandwidthHz
        );


    return noiseDbw;

}



// C/N0 calculation

function calculateCN0(){

    return (

        calculateEIRP()
        -
        calculateFSPL()
        +
        link.rxGainDbi
        -
        10*Math.log10(
            link.systemTemperatureK
        )
        +
        228.6

    );

}



// Eb/N0 calculation

function calculateEbNo(){

    return (

        calculateCN0()
        -
        10*Math.log10(
            link.dataRateBps
        )

    );

}



// Link margin

function calculateMargin(){

    return (

        calculateEbNo()
        -
        link.modcod.requiredEbNo

    );

}



// Update display

function updateBudget(){


document.getElementById("freq").innerHTML =
    link.frequencyGHz + " GHz";


document.getElementById("power").innerHTML =
    wattsToDbw(link.txPowerW).toFixed(1)
    +" dBW";


document.getElementById("gain").innerHTML =
    link.txGainDbi
    +" dBi";


document.getElementById("eirp").innerHTML =
    calculateEIRP().toFixed(1)
    +" dBW";


document.getElementById("fspl").innerHTML =
    "-"
    +
    calculateFSPL().toFixed(1)
    +" dB";


document.getElementById("rain").innerHTML =
    "-"
    +
    link.rainFadeDb
    +" dB";


document.getElementById("pointing").innerHTML =
    "-"
    +
    link.pointingLossDb
    +" dB";


document.getElementById("gt").innerHTML =
    (
    link.rxGainDbi -
    10*Math.log10(link.systemTemperatureK)
    )
    .toFixed(1)
    +" dB/K";


document.getElementById("cn0").innerHTML =
    calculateCN0().toFixed(1)
    +" dB-Hz";


document.getElementById("modcod").innerHTML =
    link.modcod.name;


let margin =
    calculateMargin();


document.getElementById("margin").innerHTML =
    margin.toFixed(1)
    +" dB";


if(margin>0){

    document.getElementById("margin")
    .className="good";

}
else{

    document.getElementById("margin")
    .className="bad";

}


}



// Start

window.onload=function(){

    updateBudget();

};
