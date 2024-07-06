document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('questionContainer');
    const submitExamBtn = document.getElementById('submitExamBtn');
    let questions = [];

    // Load questions from JSON file and localStorage
    Promise.all([
        fetch('questions.json').then(response => response.json()),
        Promise.resolve(JSON.parse(localStorage.getItem('additionalQuestions') || '[]'))
    ])
    .then(([initialQuestions, additionalQuestions]) => {
        questions = [...initialQuestions, ...additionalQuestions];
        displayQuestions();
    })
    .catch(error => console.error('Error fetching questions:', error));

    function displayQuestions() {
        questionContainer.innerHTML = ''; // Clear existing questions
        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <h3>Question ${index + 1}: ${question.text}</h3>
                <div class="options">
                    ${question.options.map((option, optionIndex) => `
                        <label>
                            <input type="radio" name="question${index}" value="${optionIndex}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;
            questionContainer.appendChild(questionElement);
        });
    }

    submitExamBtn.addEventListener('click', () => {
        const answers = [];
        questions.forEach((_, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            answers.push(selectedOption ? parseInt(selectedOption.value) : -1);
        });

        // Calculate score
        const score = questions.reduce((total, question, index) => {
            return total + (answers[index] === question.correctOption ? 1 : 0);
        }, 0);

        const totalQuestions = questions.length;
        const percentage = Math.round((score / totalQuestions) * 100);

        // Store results
        const examResult = {
            score,
            totalQuestions,
            percentage
        };

        // Retrieve existing results
        const existingResults = JSON.parse(localStorage.getItem('userExamResults') || '[]');
        existingResults.push(examResult);

        // Store updated results
        localStorage.setItem('userExamResults', JSON.stringify(existingResults));

        // Store current exam result for performance page
        localStorage.setItem('currentExamResult', JSON.stringify(examResult));

        window.location.href = 'performance.html';
    });
});