const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', {
    preload: preload,
    create: create,
    update: update
});

let questionText, answerA, answerB;
let correctAnswer, score = 0, scoreText;
let timer, timeLeft = 15, timerText;
let rocket;

function preload() {
    game.load.image('space', 'assets/space-bg.jpg');  // Background
    game.load.image('rocket', 'assets/rocket.png');   // Rocket
}

function create() {
    game.add.image(0, 0, 'space');

    rocket = game.add.sprite(400, 500, 'rocket');
    rocket.scale.setTo(0.2, 0.2);

    game.add.text(250, 50, "🚀 Astro Math Mission 🚀", { fontSize: "28px", fill: "#fff" });

    scoreText = game.add.text(600, 50, `Score: ${score}`, { fontSize: "24px", fill: "#fff" });

    timerText = game.add.text(50, 50, `Time: ${timeLeft}s`, { fontSize: "24px", fill: "#fff" });

    generateQuestion();
    startTimer();
}

function update() {
    rocket.y -= 0.1; // Slow rocket movement upward
}

function generateQuestion() {
    let questionType = Phaser.Math.between(1, 3); // Randomly choose a type
    let num1 = Phaser.Math.between(10, 50);
    let num2 = Phaser.Math.between(1, 50);

    if (questionType === 1) {
        correctAnswer = num1 + num2;
        questionText = game.add.text(300, 200, `What is ${num1} + ${num2}?`, { fontSize: "28px", fill: "#fff" });
    } else if (questionType === 2) {
        correctAnswer = num1 - num2;
        questionText = game.add.text(300, 200, `What is ${num1} - ${num2}?`, { fontSize: "28px", fill: "#fff" });
    } else {
        correctAnswer = num1 % 2 === 0 ? "Even" : "Odd";
        questionText = game.add.text(300, 200, `Is ${num1} Even or Odd?`, { fontSize: "28px", fill: "#fff" });
    }

    let wrongAnswer = correctAnswer + Phaser.Math.between(1, 5);
    let positions = Phaser.ArrayUtils.shuffle([correctAnswer, wrongAnswer]);

    if (answerA) answerA.destroy();
    if (answerB) answerB.destroy();

    answerA = game.add.text(300, 300, positions[0], { fontSize: "32px", fill: "#0f0" })
        .setInteractive()
        .inputEnabled = true;
    answerA.events.onInputDown.add(() => checkAnswer(positions[0] === correctAnswer));

    answerB = game.add.text(500, 300, positions[1], { fontSize: "32px", fill: "#f00" })
        .setInteractive()
        .inputEnabled = true;
    answerB.events.onInputDown.add(() => checkAnswer(positions[1] === correctAnswer));
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        score += 10;
        rocket.y -= 50; // Move rocket upward when correct
        alert("✅ Correct!");
    } else {
        alert("❌ Wrong! Try again.");
    }
    scoreText.setText(`Score: ${score}`);
    timeLeft = 15;  // Reset timer
    generateQuestion();
}

function startTimer() {
    timer = game.time.events.loop(Phaser.Timer.SECOND, () => {
        timeLeft--;
        timerText.setText(`Time: ${timeLeft}s`);
        if (timeLeft <= 0) {
            alert("⏳ Time's up! Mission failed.");
            timeLeft = 15;
            generateQuestion();
        }
    });
}


