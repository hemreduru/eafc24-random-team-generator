document.addEventListener("DOMContentLoaded", function() {
  const team1NameElement = document.getElementById('team1-name');
  const team1LeagueElement = document.getElementById('team1-league');
  const team1OverallElement = document.getElementById('team1-overall');
  const team1AttackElement = document.getElementById('team1-attack');
  const team1MidfieldElement = document.getElementById('team1-midfield');
  const team1DefenseElement = document.getElementById('team1-defense');

  const team2NameElement = document.getElementById('team2-name');
  const team2LeagueElement = document.getElementById('team2-league');
  const team2OverallElement = document.getElementById('team2-overall');
  const team2AttackElement = document.getElementById('team2-attack');
  const team2MidfieldElement = document.getElementById('team2-midfield');
  const team2DefenseElement = document.getElementById('team2-defense');

  const minOverallInput = document.getElementById('minOverall');
  const maxOverallInput = document.getElementById('maxOverall');
  const randomButton = document.getElementById('random-button');

  randomButton.addEventListener('click', function() {
      fetch('veriler.csv')
          .then(response => response.text())
          .then(data => {
              const lines = data.split('\n').slice(1); 
              const teams = lines.map(line => line.split(';')); 
              const totalTeams = teams.length;




              const minOverall = parseInt(minOverallInput.value);
              const maxOverall = parseInt(maxOverallInput.value);

              const filteredTeams = teams.filter(team => {
                  const overall = parseInt(team[3]);
                  return overall >= minOverall && overall <= maxOverall;
              });

              function selectRandomTeam() {
                  const randomIndex1 = Math.floor(Math.random() * filteredTeams.length);
                  const randomIndex2 = Math.floor(Math.random() * filteredTeams.length);
                  const selectedTeam1 = filteredTeams[randomIndex1]; 
                  const selectedTeam2 = filteredTeams[randomIndex2]; 

                  team1NameElement.textContent = selectedTeam1[2];
                  team1LeagueElement.textContent = selectedTeam1[1];
                  team1OverallElement.textContent = selectedTeam1[3];
                  team1AttackElement.textContent = selectedTeam1[4];
                  team1MidfieldElement.textContent = selectedTeam1[5];
                  team1DefenseElement.textContent = selectedTeam1[6];

                  team2NameElement.textContent = selectedTeam2[2];
                  team2LeagueElement.textContent = selectedTeam2[1];
                  team2OverallElement.textContent = selectedTeam2[3];
                  team2AttackElement.textContent = selectedTeam2[4];
                  team2MidfieldElement.textContent = selectedTeam2[5];
                  team2DefenseElement.textContent = selectedTeam2[6];
              }

              selectRandomTeam();
          })
          .catch(error => console.error('Dosya okuma hatası:', error));
  });

  minOverallInput.addEventListener('input', selectRandomTeam);
  maxOverallInput.addEventListener('input', selectRandomTeam);
});
