document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('resultsContainer');
    const backToDashboardBtn = document.getElementById('backToDashboardBtn');

    // Retrieve current exam result from localStorage
    const currentExamResult = JSON.parse(localStorage.getItem('currentExamResult'));

    if (currentExamResult) {
        const { score, totalQuestions, percentage } = currentExamResult;

        resultsContainer.innerHTML = `
            <h2>Exam Results</h2>
            <p>Score: ${score} out of ${totalQuestions}</p>
            <p>Percentage: ${percentage}%</p>
            <p>Performance: ${getPerformanceRating(percentage)}</p>
        `;
    } else {
        resultsContainer.innerHTML = '<p>No exam results found.</p>';
    }

    backToDashboardBtn.addEventListener('click', () => {
        // Clear the current exam result from localStorage
        localStorage.removeItem('currentExamResult');
        window.location.href = 'user-dashboard.html';
    });

    function getPerformanceRating(percentage) {
        if (percentage >= 90) return 'Excellent';
        if (percentage >= 80) return 'Very Good';
        if (percentage >= 70) return 'Good';
        if (percentage >= 60) return 'Satisfactory';
        return 'Needs Improvement';
    }
});