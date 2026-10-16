
const form = document.getElementById("scoreForm");
const generateButton = document.getElementById("generateButton");
const scoreFields = document.getElementById("scoreFields");

generateButton.addEventListener("click", function() {

    const numberOfScores = Number(
        document.getElementById("numberOfScores").value
    );

    scoreFields.innerHTML = "";

    if (
        numberOfScores < 1 ||
        numberOfScores > 20 ||
        !Number.isInteger(numberOfScores)
    ) {
        alert("Please enter a whole number between 1 and 20.");
    } else {

        for (let i = 1; i <= numberOfScores; i++) {

            const label = document.createElement("label");
            label.textContent = "Score " + i + ": ";

            const input = document.createElement("input");
            input.type = "number";
            input.className = "scoreInput";
            input.min = "0";
            input.max = "100";
            input.step = "any";
            input.required = true;

            scoreFields.appendChild(label);
            scoreFields.appendChild(input);
            scoreFields.appendChild(document.createElement("br"));
            scoreFields.appendChild(document.createElement("br"));
        }
    }
});


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const scoreInputs = document.querySelectorAll(".scoreInput");

    const scores = [];
    let total = 0;

    for (let i = 0; i < scoreInputs.length; i++) {
        const value = scoreInputs[i].value;

        if (value === "") {
            alert("Please enter every score.");
            return;
        }

        const score = Number(value);

        if (score < 0 || score > 100) {
            alert("Every score must be between 0 and 100.");
            return;
        }

        scores.push(score);
        total += score;
    }

    if (scores.length === 0) {
        alert("Please generate score fields first.");
        return;
    }

    const average = total / scores.length;
    let status;

    if (average >= 60) {
        status = "Pass";
    } else {
        status = "Fail";
    }

    document.getElementById("results").innerHTML =
        "<h2>Student Results</h2>" +
        "<p>Student: " + studentName + "</p>" +
        "<p>Scores: " + scores.join(", ") + "</p>" +
        "<p>Total: " + total + "</p>" +
        "<p>Average: " + average.toFixed(2) + "</p>" +
        "<p>Status: " + status + "</p>";
});
