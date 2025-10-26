// Function to generate a quiz based on the input paragraph and selected difficulty level
function generateQuiz() {
    const paragraph = document.getElementById('paragraphInput').value;
    const difficulty = document.getElementById('difficultySelect').value;
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = '';

    if (!paragraph.trim()) {
        quizContainer.innerHTML = '<p>Please enter a paragraph.</p>';
        return;
    }

    // Split the paragraph into sentences for generating questions
    const sentences = paragraph.split('.').filter(sentence => sentence.trim() !== '');
    
    let questions = [];

    // Create multiple-choice questions based on sentences
    sentences.forEach((sentence, index) => {
        if (index < 10) { // Limit questions to 10
            let question;
            if (difficulty === 'easy') {
                question = generateMCQ(sentence, paragraph, 'easy');
            } else if (difficulty === 'medium') {
                question = generateMCQ(sentence, paragraph, 'medium');
            } else if (difficulty === 'hard') {
                question = generateMCQ(sentence, paragraph, 'hard');
            }
            questions.push(question);
        }
    });

    // Save the current set of questions for scoring later
    currentQuestions = questions;

    // Display the generated MCQ questions
    questions.forEach((question, i) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');
        questionElement.innerHTML = `<p>Q${i + 1}: ${question.question}</p>`;

        // Display the options
        question.options.forEach((option, idx) => {
            const optionElement = document.createElement('p');
            optionElement.innerHTML = `<input type="radio" name="q${i}" value="${option}"> ${String.fromCharCode(65 + idx)}. ${option}`;
            questionElement.appendChild(optionElement);
        });

        quizContainer.appendChild(questionElement);
    });

    // Show the Submit Quiz button after the quiz is generated
    document.getElementById('submitQuizButton').style.display = 'inline-block';
    document.getElementById('scoreContainer').innerHTML = ''; // Clear previous score
}

// Function to generate multiple-choice questions (MCQ)
function generateMCQ(sentence, paragraph, difficulty) {
    const words = sentence.split(' ');
    const randomWordIndex = Math.floor(Math.random() * words.length);
    const correctAnswer = words[randomWordIndex];
    
    // Generate more relevant incorrect options
    const incorrectAnswers = generateIncorrectOptions(correctAnswer, paragraph);

    // Shuffle correct and incorrect answers to create options
    const options = shuffleArray([correctAnswer, ...incorrectAnswers]);

    return {
        question: sentence.replace(correctAnswer, '_____'), // Make it a fill-in-the-blank type MCQ
        correctAnswer: correctAnswer,
        options: options
    };
}

// Function to generate incorrect options based on context from the paragraph
function generateIncorrectOptions(correctAnswer, paragraph) {
    const paragraphWords = paragraph.split(/\s+/); // Split paragraph into words
    const filteredWords = paragraphWords.filter(word => word !== correctAnswer && word.length > 3); // Exclude the correct answer and short words
    const uniqueWords = [...new Set(filteredWords)]; // Get unique words to avoid duplicates

    // Randomly select 3 relevant words from the paragraph as incorrect options
    const incorrectOptions = [];
    while (incorrectOptions.length < 3) {
        const randomWord = uniqueWords[Math.floor(Math.random() * uniqueWords.length)];
        if (!incorrectOptions.includes(randomWord)) {
            incorrectOptions.push(randomWord);
        }
    }

    return incorrectOptions;
}

// Function to shuffle an array (to randomize the options)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to submit the quiz and calculate the score
function submitQuiz() {
    let score = 0;
    const scoreContainer = document.getElementById('scoreContainer');
    scoreContainer.innerHTML = ''; // Clear any previous score display

    currentQuestions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        
        if (selectedOption) {
            const selectedAnswer = selectedOption.value;
            const correctAnswer = question.correctAnswer;

            // Check if the selected answer is correct
            if (selectedAnswer === correctAnswer) {
                score++;
                scoreContainer.innerHTML += `<p><strong>Q${index + 1}:</strong> Correct! The answer is "${correctAnswer}".</p>`;
            } else {
                scoreContainer.innerHTML += `<p><strong>Q${index + 1}:</strong> Wrong. You selected "${selectedAnswer}", but the correct answer is "${correctAnswer}".</p>`;
            }
        } else {
            scoreContainer.innerHTML += `<p><strong>Q${index + 1}:</strong> Not answered. The correct answer is "${question.correctAnswer}".</p>`;
        }
    });

    // Display final score
    scoreContainer.innerHTML += `<h3>Your final score is: ${score} / ${currentQuestions.length}</h3>`;
}
