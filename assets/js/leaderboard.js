document.addEventListener('DOMContentLoaded', function() {
    fetch('leaderboard.json') // <-- Local file in same folder
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const leaderboardTableBody = document.querySelector('#leaderboardTable tbody');
            data.sort((a, b) => b.totalDonations - a.totalDonations);

            data.forEach((intern, index) => {
                const row = leaderboardTableBody.insertRow();
                row.insertCell().textContent = index + 1;
                row.insertCell().textContent = intern.name;
                row.insertCell().textContent = intern.referralCode;
                row.insertCell().textContent = `${intern.totalDonations.toLocaleString()}`;
            });
        })
        .catch(error => console.error('Error fetching leaderboard data:', error));
});
