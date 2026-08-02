const sceneText = document.getElementById("sceneText");
const choices = document.getElementById("choices");

const modcods = [
    {
        name: "BPSK 1/2",
        requiredEbNo: 3,
        efficiency: 0.5
    },
    {
        name: "QPSK 3/4",
        requiredEbNo: 5,
        efficiency: 1.5
    },
    {
        name: "16APSK 3/4",
        requiredEbNo: 8,
        efficiency: 3
    },
    {
        name: "64APSK 5/6",
        requiredEbNo: 12,
        efficiency: 5
    }
];

function showScene(title, text, options) {
    sceneText.innerHTML =
        "<h2>" + title + "</h2>" +
        text;

    choices.innerHTML = "";

    for (let i = 0; i < options.length; i++) {
        const button = document.createElement("button");

        button.textContent = options[i].text;

        button.onclick = options[i].action;

        choices.appendChild(button);
    }

    updateBudget();
}

function startGame() {
    showScene(
        "YEAR 2097",
        "<p>Deep in space, the heavy-metal broadcast satellite <b>METAL-X9</b> has gone silent.</p>" +
        "<p>The last transmission was a distorted guitar chord, followed by silence.</p>" +
        "<p>Earth's musicians are devastated. Scientists have been forced to listen to elevator music.</p>" +
        "<p>Your mission is to design an RF link that restores the broadcast.</p>" +
        "<p><b>Mission target:</b><br>" +
        "Data rate: 3 Mbps<br>" +
        "Target link margin: +3 dB</p>",
        [
            {
                text: "ACCEPT THE CHALLENGE",
                action: frequencyScene
            },
            {
                text: "REJECT THE CHALLENGE",
                action: rejectMission
            }
        ]
    );
}

function rejectMission() {
    showScene(
        "MISSION REJECTED",
        "<p>The satellite waits alone in the darkness.</p>" +
        "<p>Earth remains silent.</p>" +
        "<p><b>WHIMP.</b></p>",
        [
            {
                text: "TRY AGAIN",
                action: startGame
            }
        ]
    );
}

function frequencyScene() {
    showScene(
        "STEP 1: SELECT FREQUENCY",
        "<p>Frequency affects antenna gain, free-space path loss, available bandwidth, atmospheric loss, and pointing requirements.</p>" +
        "<p><b>Choose a frequency band:</b></p>",
        [
            {
                text: "S-BAND: 2.2 GHz",
                action: function () {
                    link.frequencyGHz = 2.2;
                    frequencyResult("S-band selected. Low atmospheric loss, but large antennas are needed.");
                }
            },
            {
                text: "X-BAND: 8.4 GHz",
                action: function () {
                    link.frequencyGHz = 8.4;
                    frequencyResult("X-band selected. A practical deep-space communications band.");
                }
            },
            {
                text: "KA-BAND: 32 GHz",
                action: function () {
                    link.frequencyGHz = 32;
                    frequencyResult("Ka-band selected. High capacity, but rain and pointing errors become dangerous.");
                }
            }
        ]
    );
}

function frequencyResult(message) {
    showScene(
        "FREQUENCY LOCKED",
        "<p>" + message + "</p>" +
        "<p><b>RF TIP:</b> Free-space path loss increases with frequency. However, for a fixed physical antenna size, antenna gain also increases with frequency.</p>",
        [
            {
                text: "CONFIGURE TRANSMITTER",
                action: powerScene
            }
        ]
    );
}

function powerScene() {
    showScene(
        "STEP 2: TRANSMITTER POWER",
        "<p>The spacecraft power system is limited. More RF power improves the link but creates more heat and consumes more electrical energy.</p>" +
        "<p><b>Choose an amplifier:</b></p>",
        [
            {
                text: "50 W",
                action: function () {
                    link.txPowerW = 50;
                    powerResult();
                }
            },
            {
                text: "250 W",
                action: function () {
                    link.txPowerW = 250;
                    powerResult();
                }
            },
            {
                text: "500 W",
                action: function () {
                    link.txPowerW = 500;
                    powerResult();
                }
            }
        ]
    );
}

function powerResult() {
    const powerDbw = wattsToDbw(link.txPowerW);

    showScene(
        "TRANSMITTER CONFIGURED",
        "<p>Selected power: <b>" +
        link.txPowerW +
        " W</b></p>" +
        "<p>Power in dBW: <b>" +
        powerDbw.toFixed(2) +
        " dBW</b></p>" +
        "<p><b>Equation:</b> P(dBW) = 10 log10(P in watts)</p>" +
        "<p><b>RF TIP:</b> A tenfold increase in power is only a 10 dB increase.</p>",
        [
            {
                text: "SELECT ANTENNA",
                action: antennaScene
            }
        ]
    );
}

function antennaScene() {
    showScene(
        "STEP 3: TRANSMIT ANTENNA",
        "<p>A high-gain antenna concentrates RF energy into a narrow beam.</p>" +
        "<p>Choose the satellite antenna:</p>",
        [
            {
                text: "SMALL ANTENNA: 20 dBi",
                action: function () {
                    link.txGainDbi = 20;
                    antennaResult();
                }
            },
            {
                text: "MEDIUM DISH: 35 dBi",
                action: function () {
                    link.txGainDbi = 35;
                    antennaResult();
                }
            },
            {
                text: "DEEP-SPACE DISH: 42 dBi",
                action: function () {
                    link.txGainDbi = 42;
                    antennaResult();
                }
            }
        ]
    );
}

function antennaResult() {
    const eirp = calculateEIRP();

    showScene(
        "EIRP CALCULATED",
        "<p><b>EIRP = TX power + antenna gain - TX losses</b></p>" +
        "<p>Current EIRP: <b>" +
        eirp.toFixed(2) +
        " dBW</b></p>" +
        "<p><b>RF TIP:</b> Antenna gain does not create power. It focuses existing power into a narrower direction.</p>",
        [
            {
                text: "SET BANDWIDTH",
                action: bandwidthScene
            }
        ]
    );
}

function bandwidthScene() {
    showScene(
        "STEP 4: TRANSMIT BANDWIDTH",
        "<p>Bandwidth affects data capacity and receiver noise.</p>" +
        "<p>A wider bandwidth can carry more information, but thermal noise increases with bandwidth.</p>",
        [
            {
                text: "100 kHz",
                action: function () {
                    link.bandwidthHz = 100000;
                    bandwidthResult();
                }
            },
            {
                text: "1 MHz",
                action: function () {
                    link.bandwidthHz = 1000000;
                    bandwidthResult();
                }
            },
            {
                text: "10 MHz",
                action: function () {
                    link.bandwidthHz = 10000000;
                    bandwidthResult();
                }
            }
        ]
    );
}

function bandwidthResult() {
    const noise = calculateNoise();

    showScene(
        "BANDWIDTH SET",
        "<p>Bandwidth: <b>" +
        (link.bandwidthHz / 1000000) +
        " MHz</b></p>" +
        "<p>Calculated thermal noise: <b>" +
        noise.toFixed(2) +
        " dBW</b></p>" +
        "<p><b>Equation:</b> N = kTB</p>" +
        "<p><b>RF TIP:</b> Doubling bandwidth increases noise by approximately 3 dB.</p>",
        [
            {
                text: "SELECT MODCOD",
                action: modcodScene
            }
        ]
    );
}

function modcodScene() {
    showScene(
        "STEP 5: SELECT MODCOD",
        "<p>The modulation and coding scheme determines spectral efficiency and the required Eb/N0.</p>" +
        "<p>Higher-order modulation can carry more bits but requires a cleaner link.</p>",
        [
            {
                text: "BPSK 1/2: ROBUST",
                action: function () {
                    link.modcod = modcods[0];
                    modcodResult();
                }
            },
            {
                text: "QPSK 3/4: BALANCED",
                action: function () {
                    link.modcod = modcods[1];
                    modcodResult();
                }
            },
            {
                text: "16APSK 3/4: FAST",
                action: function () {
                    link.modcod = modcods[2];
                    modcodResult();
                }
            },
            {
                text: "64APSK 5/6: MAXIMUM METAL",
                action: function () {
                    link.modcod = modcods[3];
                    modcodResult();
                }
            }
        ]
    );
}

function modcodResult() {
    showScene(
        "MODCOD LOCKED",
        "<p>Selected: <b>" +
        link.modcod.name +
        "</b></p>" +
        "<p>Required Eb/N0: <b>" +
        link.modcod.requiredEbNo +
        " dB</b></p>" +
        "<p><b>RF TIP:</b> The required Eb/N0 depends on the actual modem, coding, target BER or PER, and implementation losses. These values are simplified game values.</p>",
        [
            {
                text: "CONFIGURE EARTH STATION",
                action: receiverScene
            }
        ]
    );
}

function receiverScene() {
    showScene(
        "STEP 6: RECEIVER G/T",
        "<p>G/T combines receiving antenna gain with system noise temperature.</p>" +
        "<p>Higher G/T means the ground station can hear weaker signals.</p>",
        [
            {
                text: "SMALL STATION: G/T ABOUT 25 dB/K",
                action: function () {
                    link.rxGainDbi = 50;
                    link.systemTemperatureK = 316;
                    receiverResult();
                }
            },
            {
                text: "DEEP-SPACE STATION: G/T ABOUT 55 dB/K",
                action: function () {
                    link.rxGainDbi = 75;
                    link.systemTemperatureK = 100;
                    receiverResult();
                }
            }
        ]
    );
}

function receiverResult() {
    const gt =
        link.rxGainDbi -
        10 * Math.log10(link.systemTemperatureK);

    showScene(
        "RECEIVER CONFIGURED",
        "<p>Calculated G/T: <b>" +
        gt.toFixed(2) +
        " dB/K</b></p>" +
        "<p><b>Equation:</b> G/T = G(dBi) - 10 log10(T in kelvin)</p>" +
        "<p><b>RF TIP:</b> Lower noise temperature improves G/T without increasing antenna size.</p>",
        [
            {
                text: "CHECK WEATHER",
                action: weatherScene
            }
        ]
    );
}

function weatherScene() {
    showScene(
        "STEP 7: RAIN FADE",
        "<p>A storm is approaching the Earth station.</p>" +
        "<p>Rain attenuation is usually more important at higher frequencies, especially Ka-band.</p>",
        [
            {
                text: "CLEAR SKY: 0 dB",
                action: function () {
                    link.rainFadeDb = 0;
                    finalReview();
                }
            },
            {
                text: "MODERATE RAIN: 5 dB",
                action: function () {
                    link.rainFadeDb = 5;
                    finalReview();
                }
            },
            {
                text: "HEAVY STORM: 15 dB",
                action: function () {
                    link.rainFadeDb = 15;
                    finalReview();
                }
            }
        ]
    );
}

function finalReview() {
    const margin = calculateMargin();

    showScene(
        "FINAL LINK REVIEW",
        "<p>Your link budget is now complete.</p>" +
        "<p>Calculated link margin: <b>" +
        margin.toFixed(2) +
        " dB</b></p>" +
        "<p>Mission target: <b>+3.0 dB</b></p>" +
        "<p>Review the live budget panel before transmitting.</p>",
        [
            {
                text: "TRANSMIT HEAVY METAL",
                action: finalMission
            },
            {
                text: "REDESIGN LINK",
                action: frequencyScene
            }
        ]
    );
}

function finalMission() {
    const margin = calculateMargin();

    if (margin >= 3) {
        showScene(
            "MISSION SUCCESS",
            "<p><b>CARRIER LOCKED.</b></p>" +
            "<p>The demodulator synchronizes.</p>" +
            "<p>A beam of heavy metal crosses deep space and reaches Earth.</p>" +
            "<p>Scientists headbang. Astronauts play air guitar. The planet rocks again.</p>" +
            "<p><b>FINAL MARGIN:
