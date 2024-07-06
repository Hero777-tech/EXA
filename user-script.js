/*document.addEventListener('DOMContentLoaded', () => {
    const takeExamBtn = document.getElementById('takeExamBtn');
    const viewResultsBtn = document.getElementById('viewResultsBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const contentArea = document.getElementById('contentArea');

    takeExamBtn.addEventListener('click', () => {
        window.location.href = 'exam.html';
    });

    viewResultsBtn.addEventListener('click', () => {
        // In a real application, you would fetch this data from storage
        contentArea.innerHTML = `
            <h2>Your Exam Results</h2>
            <ul>
                <li>Exam 1: 80%</li>
                <li>Exam 2: 75%</li>
                <li>Exam 3: 90%</li>
            </ul>
        `;
    });

    logoutBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});  -->> static data */

document.addEventListener('DOMContentLoaded', () => {
    const takeExamBtn = document.getElementById('takeExamBtn');
    const viewResultsBtn = document.getElementById('viewResultsBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const contentArea = document.getElementById('contentArea');

    takeExamBtn.addEventListener('click', () => {
        window.location.href = 'exam.html';
    });

    viewResultsBtn.addEventListener('click', () => {
        // Fetch exam results from localStorage
        const examResults = getExamResults();
        
        if (examResults.length === 0) {
            contentArea.innerHTML = '<h2>Your Exam Results</h2><p>You haven\'t taken any exams yet.</p>';
        } else {
            let resultsHTML = '<h2>Your Exam Results</h2><ul>';
            examResults.forEach((result, index) => {
                resultsHTML += `<li>Exam ${index + 1}: ${result.percentage}% (Score: ${result.score}/${result.totalQuestions})</li>`;
            });
            resultsHTML += '</ul>';
            contentArea.innerHTML = resultsHTML;
        }
    });

    logoutBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    function getExamResults() {
        const results = localStorage.getItem('userExamResults');
        return results ? JSON.parse(results) : [];
    }
});
