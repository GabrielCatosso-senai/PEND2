class FootballAPI {
  constructor() {
    this.baseUrl = 'https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=';
  }

  async fetchTeamData(teamName) {
    const url = `${this.baseUrl}${encodeURIComponent(teamName)}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.teams;
  }
}

class UIController {
  constructor() {
    this.api = new FootballAPI();
    
    this.searchBtn = document.getElementById('searchBtn');
    this.teamInput = document.getElementById('teamInput');
    this.resultsContainer = document.getElementById('resultsContainer');
    this.loadingElement = document.getElementById('loading');
    this.errorElement = document.getElementById('errorMessage');

    this.initEvents();
  }

  initEvents() {
    this.searchBtn.addEventListener('click', () => this.handleSearch());
    
    this.teamInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    });
  }

  async handleSearch() {
    const query = this.teamInput.value.trim();

    if (!query) {
      this.showError('Por favor, digite o nome de um time antes de buscar.');
      return;
    }

    this.clearUI();
    this.toggleLoading(true);

    try {
      const teams = await this.api.fetchTeamData(query);

      if (!teams) {
        this.showError('Nenhum time encontrado com esse nome. Tente novamente.');
      } else {
        this.renderTeams(teams);
      }
    } catch (error) {
      console.error('Erro ao consumir API:', error);
      this.showError('Ocorreu um erro ao buscar os dados. Verifique sua conexão e tente novamente.');
    } finally {
      this.toggleLoading(false);
    }
  }

  renderTeams(teams) {
    teams.forEach(team => {
      const card = document.createElement('div');
      card.className = 'card';

      const badgeUrl = team.strBadge || 'https://via.placeholder.com/120?text=Sem+Escudo';
      const description = team.strDescriptionPT || team.strDescriptionEN || 'Descrição indisponível.';

      card.innerHTML = `
        <img src="${badgeUrl}" alt="Escudo do ${team.strTeam}">
        <h3>${team.strTeam}</h3>
        <p><strong>País:</strong> ${team.strCountry || 'N/A'}</p>
        <p><strong>Estádio:</strong> ${team.strStadium || 'N/A'}</p>
        <p style="margin-top: 10px;">${description.slice(0, 150)}...</p>
      `;

      this.resultsContainer.appendChild(card);
    });
  }

  clearUI() {
    this.resultsContainer.innerHTML = '';
    this.errorElement.textContent = '';
    this.errorElement.classList.add('hidden');
  }

  showError(message) {
    this.errorElement.textContent = message;
    this.errorElement.classList.remove('hidden');
  }

  toggleLoading(isLoading) {
    if (isLoading) {
      this.loadingElement.classList.remove('hidden');
    } else {
      this.loadingElement.classList.add('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new UIController();
});