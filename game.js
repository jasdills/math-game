const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', {
    preload: preload,
    create: create,
    update: update
});

let questionText, answerA, answerB;
let correctAnswer, score = 0, scoreText;
let timer, timeLeft = 10, timerText;

function preload() {
    game.load.image('background', 'assets/space-bg.jpg'); // Optional space background
}

function create() {
    game.add.image(0, 0, 'background');

    game.add.text(250, 50, "🚀 Space Math Adventure 🚀", { fontSize: "28px", fill: "#fff" });

    scoreText = game.add.text(600, 50, `Score: ${score}`, { fontSize: "24px", fill: "#fff" });

    timerText = game.add.text(50, 50, `Time: ${timeLeft}s`, { fontSize: "24px", fill: "#fff" });

    generateQuestion();
    startTimer();
}

function update() {}

function generateQuestion() {
    let num1 = Phaser.Math.between(10, 50);
    let num2 = Phaser.Math.between(1, 50);
    let operation = Phaser.Math.between(0, 1) === 0 ? '+' : '-';

    correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;

    if (questionText) questionText.destroy();
    questionText = game.add.text(300, 200, `${num1} ${operation} ${num2} = ?`, { fontSize: "32px", fill: "#fff" });

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
        alert("✅ Correct!");
    } else {
        alert("❌ Wrong! Try again.");
    }
    scoreText.setText(`Score: ${score}`);
    timeLeft = 10;  // Reset timer
    generateQuestion();
}

function startTimer() {
    timer = game.time.events.loop(Phaser.Timer.SECOND, () => {
        timeLeft--;
        timerText.setText(`Time: ${timeLeft}s`);
        if (timeLeft <= 0) {
            alert("⏳ Time's up! Try again.");
            timeLeft = 10;
            generateQuestion();
        }
    });
}

