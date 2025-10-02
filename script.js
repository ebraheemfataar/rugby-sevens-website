// Data
const fixtures = [
    { id: 1, time: "10:00", team1: "South Africa", team2: "New Zealand", pool: "A", status: "upcoming" },
    { id: 2, time: "10:30", team1: "Fiji", team2: "Australia", pool: "B", status: "upcoming" },
    { id: 3, time: "11:00", team1: "Argentina", team2: "France", pool: "A", status: "upcoming" },
    { id: 4, time: "11:30", team1: "England", team2: "USA", pool: "C", status: "upcoming" },
    { id: 5, time: "14:00", team1: "Ireland", team2: "Samoa", pool: "B", status: "live" },
    { id: 6, time: "14:30", team1: "Kenya", team2: "Spain", pool: "C", status: "upcoming" },
    { id: 7, time: "15:00", team1: "South Africa", team2: "Australia", pool: "A", status: "upcoming" },
    { id: 8, time: "15:30", team1: "New Zealand", team2: "Fiji", pool: "B", status: "upcoming" },
];

const teams = [
    { id: 1, name: "South Africa", pool: "A", players: 12, ranking: 1 },
    { id: 2, name: "New Zealand", pool: "A", players: 12, ranking: 2 },
    { id: 3, name: "Fiji", pool: "B", players: 12, ranking: 3 },
    { id: 4, name: "Australia", pool: "B", players: 12, ranking: 4 },
    { id: 5, name: "Argentina", pool: "A", players: 12, ranking: 5 },
    { id: 6, name: "France", pool: "C", players: 12, ranking: 6 },
    { id: 7, name: "Ireland", pool: "B", players: 12, ranking: 7 },
    { id: 8, name: "England", pool: "C", players: 12, ranking: 8 },
    { id: 9, name: "USA", pool: "C", players: 12, ranking: 9 },
    { id: 10, name: "Samoa", pool: "A", players: 12, ranking: 10 },
    { id: 11, name: "Kenya", pool: "B", players: 12, ranking: 11 },
    { id: 12, name: "Spain", pool: "C", players: 12, ranking: 12 },
];

const players = [
    { id: 1, name: "Seb Bloemhard", team: "South Africa", position: "Forward", number: 7 },
    { id: 2, name: "Christie Grobbelaar", team: "South Africa", position: "Back", number: 9 },
    { id: 3, name: "Scott Curry", team: "New Zealand", position: "Forward", number: 2 },
    { id: 4, name: "Jerry Tuwai", team: "Fiji", position: "Playmaker", number: 10 },
    { id: 5, name: "Henry Paterson", team: "Australia", position: "Wing", number: 11 },
    { id: 6, name: "Marcos Moneta", team: "Argentina", position: "Wing", number: 14 },
    { id: 7, name: "Antoine Dupont", team: "France", position: "Scrum-half", number: 9 },
    { id: 8, name: "Jordan Conroy", team: "Ireland", position: "Wing", number: 11 },
    { id: 9, name: "Dan Norton", team: "England", position: "Wing", number: 12 },
    { id: 10, name: "Perry Baker", team: "USA", position: "Wing", number: 8 },
    { id: 11, name: "Alasio Naduva", team: "Samoa", position: "Forward", number: 5 },
    { id: 12, name: "Nelson Oyoo", team: "Kenya", position: "Forward", number: 6 },
];

// Load Fixtures
function loadFixtures() {
    const container = document.getElementById('fixtures-container');
    if (!container) return;

    fixtures.forEach((fixture, index) => {
        const statusBadge = fixture.status === 'live' 
            ? '<span class="badge bg-danger">LIVE NOW</span>'
            : '<span class="badge bg-secondary">UPCOMING</span>';

        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="card h-100 animate-scale-in" style="animation-delay: ${index * 50}ms">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        ${statusBadge}
                        <span class="badge bg-light text-dark">Pool ${fixture.pool}</span>
                    </div>
                    <div class="d-flex align-items-center gap-2 text-muted">
                        <i class="bi bi-clock"></i>
                        <span>${fixture.time}</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                        <span class="fw-semibold">${fixture.team1}</span>
                        <span class="fs-4 fw-bold text-muted">VS</span>
                        <span class="fw-semibold">${fixture.team2}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Load Teams
function loadTeams() {
    const container = document.getElementById('teams-container');
    if (!container) return;

    teams.forEach((team, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="card h-100 animate-scale-in" style="animation-delay: ${index * 50}ms">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-secondary">Pool ${team.pool}</span>
                        <div class="d-flex align-items-center gap-1 text-gold">
                            <i class="bi bi-trophy-fill"></i>
                            <span class="fw-bold">#${team.ranking}</span>
                        </div>
                    </div>
                </div>
                <div class="card-body text-center">
                    <div class="team-avatar mb-3">
                        ${team.name.slice(0, 2).toUpperCase()}
                    </div>
                    <h5 class="card-title">${team.name}</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 text-muted">
                        <i class="bi bi-people-fill"></i>
                        <span>${team.players} Players</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Load Players
function loadPlayers() {
    const container = document.getElementById('players-container');
    if (!container) return;

    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4 col-lg-3';
        card.innerHTML = `
            <div class="card h-100 animate-scale-in" style="animation-delay: ${index * 40}ms">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-secondary small">${player.team}</span>
                        <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" 
                             style="width: 40px; height: 40px; background-color: #2d5016;">
                            ${player.number}
                        </div>
                    </div>
                </div>
                <div class="card-body text-center">
                    <div class="player-avatar mb-3">
                        <i class="bi bi-person-fill fs-1"></i>
                    </div>
                    <h6 class="card-title mb-1">${player.name}</h6>
                    <p class="text-muted small mb-0">${player.position}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFixtures();
    loadTeams();
    loadPlayers();
});
