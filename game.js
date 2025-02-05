const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', {
    preload: preload,
    create: create,
    update: update
});

let questionText, answerA, answerB, answerC;
let correctAnswer, score = 0, scoreText;
let timer, timeLeft = 15, timerText;
let rocket, planet;
let correctCount = 0;

function preload() {
    game.load.image('space', 'assets/space-bg.jpg');  // Background
    game.load.image('rocket', 'assets/rocket.png');   // Rocket
    game.load.image('planet', 'assets/planet.png');   // Planet
}

function create() {
    game.add.image(0, 0, 'space');

    rocket = game.add.sprite(400, 500, 'rocket');
    rocket.anchor.setTo(0.5, 0.5);
    rocket.scale.setTo(0.2, 0.2);

    planet = game.add.sprite(400, 100, 'planet');
    planet.anchor.setTo(0.5, 0.5);
    planet.scale.setTo(0.3, 0.3);

    game.add.text(220, 30, "🚀 Astro Math Mission 🚀", { fontSize: "28px", fill: "#fff" });

    scoreText = game.add.text(600, 50, `Score: ${score}`, { fontSize: "24px", fill: "#fff" });

    timerText = game.add.text(50, 50, `Time: ${timeLeft}s`, { fontSize: "24px", fill: "#fff" });

    generateQuestion();
    startTimer();
}

function update() {
    if (rocket.y > 150) { // Prevent rocket from going off screen
        rocket.y -= 0.05; 
    }
}

function generateQuestion() {
    let questionType = Phaser.Math.between(1, 3); // Randomly choose a type
    let num1 = Phaser.Math.between(10, 50);
    let num2 = Phaser.Math.between(1, 50);

    if (questionText) questionText.destroy();

    if (questionType === 1) { 
        correctAnswer = num1 + num2;
        questionText = game.add.text(250, 200, `${num1} + ${num2} = ?`, { fontSize: "28px", fill: "#fff" });
    } else if (questionType === 2) { 
        correctAnswer = num1 - num2;
        questionText = game.add.text(250, 200, `${num1} - ${num2} = ?`, { fontSize: "28px", fill: "#fff" });
    } else { 
        correctAnswer = (num1 % 2 === 0) ? "Even" : "Odd";
        questionText = game.add.text(250, 200, `Is ${num1} Even or Odd?`, { fontSize: "28px", fill: "#fff" });
    }

    let wrongAnswer1 = correctAnswer + Phaser.Math.between(1, 5);
    let wrongAnswer2 = correctAnswer - Phaser.Math.between(1, 5);
    let answers = Phaser.ArrayUtils.shuffle([correctAnswer, wrongAnswer1, wrongAnswer2]);

    if (answerA) answerA.destroy();
    if (answerB) answerB.destroy();
    if (answerC) answerC.destroy();

    answerA = createAnswer(250, 300, answers[0]);
    answerB = createAnswer(450, 300, answers[1]);
    answerC = createAnswer(650, 300, answers[2]);
}

function createAnswer(x, y, value) {
    let answer = game.add.text(x, y, value.toString(), { fontSize: "32px", fill: "#0f0" });
    answer.inputEnabled = true;
    answer.events.onInputDown.add(function() {
        checkAnswer(value === correctAnswer);
    }, this);
    return answer;
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        score += 10;
        correctCount++;
        rocket.y -= 50; // Move rocket upward when correct
        if (correctCount >= 5) {
            alert("🌎 You've reached a new planet!");
            correctCount = 0;
            rocket.y = 500; // Reset position
        }
        alert("✅ Correct!");
    } else {
        alert("❌ Wrong! Try again.");
    }
    scoreText.setText(`Score: ${score}`);
    timeLeft = 15;  // Reset timer
    generateQuestion();
}

function startTimer() {
    timer = game.time.events.loop(Phaser.Timer.SECOND, function() {
        timeLeft--;
        timerText.setText(`Time: ${timeLeft}s`);
        if (timeLeft <= 0) {
            alert("⏳ Time's up! Mission failed.");
            timeLeft = 15;
            generateQuestion();
        }
    }, this);
}




