const sceneText = document.getElementById("sceneText");
const choices = document.getElementById("choices");

sceneText.innerHTML = `
    <h2>YEAR 2097</h2>

    <p>
        Deep in the outer solar system, the heavy-metal
        broadcast satellite <b>METAL-X9</b> has gone silent.
    </p>

    <p>
        Its final transmission was a screaming guitar solo,
        followed by static.
    </p>

    <p>
        Earth's musicians have fallen silent.
        Scientists are listening to elevator music.
        Civilization is in danger.
    </p>

    <p>
        You are the only RF engineer capable of restoring
        the deep-space link.
    </p>

    <p>
        <b>MISSION:</b><br>
        Build a working satellite link budget.<br>
        Restore heavy metal to Earth.
    </p>
`;

choices.innerHTML = `
    <button id="acceptButton">
        ACCEPT THE CHALLENGE 🤘
    </button>

    <button id="rejectButton">
        REJECT THE CHALLENGE
    </button>
`;

document
    .getElementById("acceptButton")
    .addEventListener("click", function () {

        sceneText.innerHTML = `
            <h2>MISSION ACCEPTED</h2>

            <p>
                Mission Control erupts in applause.
            </p>

            <p>
                The first step is selecting the
                communications frequency.
            </p>

            <p>
                <b>RF TIP:</b><br>
                Frequency affects path loss,
                antenna gain, atmospheric attenuation,
                bandwidth, and pointing requirements.
            </p>
        `;

        choices.innerHTML = `
            <button id="frequencyButton">
                BEGIN FREQUENCY DESIGN
            </button>
        `;

        document
            .getElementById("frequencyButton")
            .addEventListener("click", function () {

                sceneText.innerHTML = `
                    <h2>STEP 1: SELECT FREQUENCY</h2>

                    <p>
                        Choose a frequency band for
                        METAL-X9.
                    </p>
                `;

                choices.innerHTML = `
                    <button>S-BAND — 2.2 GHz</button>
                    <button>X-BAND — 8.4 GHz</button>
                    <button>KA-BAND — 32 GHz</button>
                `;
            });
    });

document
    .getElementById("rejectButton")
    .addEventListener("click", function () {

        sceneText.innerHTML = `
            <h2>MISSION REJECTED</h2>

            <p>
                The satellite drifts silently through space.
            </p>

            <p>
                Earth receives no music.
            </p>

            <h1>WHIMP.</h1>
        `;

        choices.innerHTML = `
            <button id="retryButton">
                CHANGE YOUR MIND
            </button>
        `;

        document
            .getElementById("retryButton")
            .addEventListener("click", function () {
                location.reload();
            });
    });
