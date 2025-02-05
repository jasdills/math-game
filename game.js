const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let questionText, answerA, answerB;
let correctAnswer, score = 0, scoreText;

function preload() {
    // Load assets here if needed
}

function create() {
    this.add.text(300, 50, "Math Game", { fontSize: "32px", fill: "#fff" });

    scoreText = this.add.text(600, 50, `Score: ${score}`, { fontSize: "24px", fill: "#fff" });

    generateQuestion(this);
}

function update() {
    // Game logic updates here (optional)
}

function generateQuestion(scene) {
    let num1 = Phaser.Math.Between(1, 10);
    let num2 = Phaser.Math.Between(1, 10);
    correctAnswer = num1 + num2;

    if (questionText) questionText.destroy();
    questionText = scene.add.text(300, 150, `What is ${num1} + ${num2}?`, { fontSize: "24px", fill: "#fff" });

    let wrongAnswer = correctAnswer + Phaser.Math.Between(1, 3);
    let positions = Phaser.Utils.Array.Shuffle([correctAnswer, wrongAnswer]);

    if (answerA) answerA.destroy();
    if (answerB) answerB.destroy();

    answerA = scene.add.text(300, 250, positions[0], { fontSize: "24px", fill: "#0f0" })
        .setInteractive()
        .on('pointerdown', () => checkAnswer(positions[0] === correctAnswer, scene));

    answerB = scene.add.text(400, 250, positions[1], { fontSize: "24px", fill: "#f00" })
        .setInteractive()
        .on('pointerdown', () => checkAnswer(positions[1] === correctAnswer, scene));
}

function checkAnswer(isCorrect, scene) {
    if (isCorrect) {
        score += 10;
        alert("Correct!");
    } else {
        alert("Wrong! Try again.");
    }
    scoreText.setText(`Score: ${score}`);
    generateQuestion(scene);
}
