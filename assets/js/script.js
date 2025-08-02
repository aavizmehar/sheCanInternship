document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Dummy authentication
    window.location.href = 'dashboard.html';
});


fetch('leaderboard.json')
  .then(res => res.json())
  .then(data => {
    console.log(data); // ← See it in DevTools console
  })
  .catch(err => console.error(err));
