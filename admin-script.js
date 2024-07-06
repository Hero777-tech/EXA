document.addEventListener('DOMContentLoaded', () => {
    const setQuestionsBtn = document.getElementById('setQuestionsBtn');
    const viewQuestionsBtn = document.getElementById('viewQuestionsBtn');
    const viewPerformanceBtn = document.getElementById('viewPerformanceBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const contentArea = document.getElementById('contentArea');

    let initialQuestions = [];
    let additionalQuestions = [];

    // Load initial questions from JSON file
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            initialQuestions = data;
            // Load additional questions from localStorage
            additionalQuestions = JSON.parse(localStorage.getItem('additionalQuestions') || '[]');
        })
        .catch(error => console.error('Error loading initial questions:', error));

    setQuestionsBtn.addEventListener('click', () => {
        contentArea.innerHTML = `
            <h2>Set Questions</h2>
            <form id="questionForm">
                <input type="text" id="questionText" placeholder="Question" required>
                <input type="text" id="option1" placeholder="Option 1" required>
                <input type="text" id="option2" placeholder="Option 2" required>
                <input type="text" id="option3" placeholder="Option 3" required>
                <input type="text" id="option4" placeholder="Option 4" required>
                <input type="number" id="correctOption" placeholder="Correct Option (1-4)" required min="1" max="4">
                <button type="submit">Add Question</button>
            </form>
        `;

        const questionForm = document.getElementById('questionForm');
        questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newQuestion = {
                text: document.getElementById('questionText').value,
                options: [
                    document.getElementById('option1').value,
                    document.getElementById('option2').value,
                    document.getElementById('option3').value,
                    document.getElementById('option4').value
                ],
                correctOption: parseInt(document.getElementById('correctOption').value) - 1
            };

            // Add new question to additionalQuestions
            additionalQuestions.push(newQuestion);
            
            // Save updated additional questions to localStorage
            localStorage.setItem('additionalQuestions', JSON.stringify(additionalQuestions));

            alert('Question added successfully!');
            questionForm.reset();
        });
    });

    viewQuestionsBtn.addEventListener('click', () => {
        const allQuestions = [...initialQuestions, ...additionalQuestions];
        let questionsHTML = '<h2>All Questions</h2>';
        
        if (allQuestions.length === 0) {
            questionsHTML += '<p>No questions available.</p>';
        } else {
            questionsHTML += '<ul>';
            allQuestions.forEach((question, index) => {
                questionsHTML += `
                    <li>
                        ${question.text}
                        ${index >= initialQuestions.length ? `<button onclick="removeQuestion(${index - initialQuestions.length})">Remove</button>` : ''}
                    </li>
                `;
            });
            questionsHTML += '</ul>';
        }
        
        contentArea.innerHTML = questionsHTML;
    });

    viewPerformanceBtn.addEventListener('click', () => {
        const userExamResults = JSON.parse(localStorage.getItem('userExamResults') || '[]');
        
        if (userExamResults.length === 0) {
            contentArea.innerHTML = `
                <h2>User Performance</h2>
                <p>No exam attempts have been made yet.</p>
                <button id="clearRecordsBtn" disabled>Clear User Records</button>
            `;
        } else {
            let performanceHTML = `
                <h2>User Performance</h2>
                <table>
                    <tr>
                        <th>Exam</th>
                        <th>Score</th>
                        <th>Percentage</th>
                    </tr>
            `;
            
            userExamResults.forEach((result, index) => {
                performanceHTML += `
                    <tr>
                        <td>Exam ${index + 1}</td>
                        <td>${result.score}/${result.totalQuestions}</td>
                        <td>${result.percentage}%</td>
                    </tr>
                `;
            });
            
            performanceHTML += `
                </table>
                <button id="clearRecordsBtn">Clear User Records</button>
            `;
            
            contentArea.innerHTML = performanceHTML;
            
            const clearRecordsBtn = document.getElementById('clearRecordsBtn');
            clearRecordsBtn.addEventListener('click', clearUserRecords);
        }
    });

    logoutBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function removeQuestion(index) {
    let additionalQuestions = JSON.parse(localStorage.getItem('additionalQuestions') || '[]');
    additionalQuestions.splice(index, 1);
    localStorage.setItem('additionalQuestions', JSON.stringify(additionalQuestions));
    document.getElementById('viewQuestionsBtn').click(); // Refresh the question list
}

function clearUserRecords() {
    if (confirm('Are you sure you want to clear all user exam records? This action cannot be undone.')) {
        localStorage.removeItem('userExamResults');
        alert('User records have been cleared.');
        document.getElementById('viewPerformanceBtn').click(); // Refresh the performance view
    }
}