import requests
from flask import current_app


MOCK_LIVESCORES = [
    {
        'id': 1001,
        'homeTeam': {'id': 1, 'name': 'Arsenal', 'shortName': 'ARS', 'logo': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', 'country': 'England'},
        'awayTeam': {'id': 2, 'name': 'Chelsea', 'shortName': 'CHE', 'logo': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', 'country': 'England'},
        'league': {'id': 1, 'name': 'Premier League', 'logo': None, 'country': 'England'},
        'startTime': '2026-08-23T15:00:00Z',
        'status': 'live',
        'homeScore': 2,
        'awayScore': 1,
        'minute': 72,
        'venue': 'Emirates Stadium',
        'sport': 'football',
    },
    {
        'id': 1002,
        'homeTeam': {'id': 3, 'name': 'Manchester City', 'shortName': 'MCI', 'logo': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', 'country': 'England'},
        'awayTeam': {'id': 4, 'name': 'Liverpool', 'shortName': 'LIV', 'logo': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', 'country': 'England'},
        'league': {'id': 1, 'name': 'Premier League', 'logo': None, 'country': 'England'},
        'startTime': '2026-08-23T15:00:00Z',
        'status': 'live',
        'homeScore': 1,
        'awayScore': 0,
        'minute': 55,
        'venue': 'Etihad Stadium',
        'sport': 'football',
    },
]

MOCK_STANDINGS = [
    {'team': {'id': 1, 'name': 'Arsenal', 'shortName': 'ARS', 'logo': None}, 'played': 24, 'won': 16, 'drawn': 5, 'lost': 3, 'goalsFor': 48, 'goalsAgainst': 22, 'goalDiff': 26, 'points': 53},
    {'team': {'id': 3, 'name': 'Manchester City', 'shortName': 'MCI', 'logo': None}, 'played': 24, 'won': 15, 'drawn': 4, 'lost': 5, 'goalsFor': 52, 'goalsAgainst': 28, 'goalDiff': 24, 'points': 49},
    {'team': {'id': 4, 'name': 'Liverpool', 'shortName': 'LIV', 'logo': None}, 'played': 24, 'won': 14, 'drawn': 6, 'lost': 4, 'goalsFor': 44, 'goalsAgainst': 24, 'goalDiff': 20, 'points': 48},
    {'team': {'id': 2, 'name': 'Chelsea', 'shortName': 'CHE', 'logo': None}, 'played': 24, 'won': 12, 'drawn': 7, 'lost': 5, 'goalsFor': 38, 'goalsAgainst': 26, 'goalDiff': 12, 'points': 43},
]


class SportmonksService:
    def _get_headers(self):
        return {
            'Authorization': current_app.config.get('SPORTMONKS_API_KEY', ''),
        }

    def _get_params(self, extra=None):
        params = {}
        if extra:
            params.update(extra)
        return params

    @property
    def base_url(self):
        return current_app.config.get('SPORTMONKS_BASE_URL', 'https://api.sportmonks.com/v3/football')

    @property
    def has_api_key(self):
        return bool(current_app.config.get('SPORTMONKS_API_KEY', ''))

    def get_livescores(self, inplay_only=False):
        if not self.has_api_key:
            return {'data': MOCK_LIVESCORES}

        endpoint = '/livescores/inplay' if inplay_only else '/livescores'
        url = f'{self.base_url}{endpoint}'
        params = self._get_params()

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks livescores error: {e}')
            return {'data': MOCK_LIVESCORES}

    def get_fixtures_by_date(self, date_str):
        if not self.has_api_key:
            return {'data': []}

        url = f'{self.base_url}/fixtures/date/{date_str}'
        params = self._get_params()

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks fixtures error: {e}')
            return {'data': [], 'error': str(e)}

    def get_fixture_by_id(self, fixture_id):
        if not self.has_api_key:
            return {'data': None}

        url = f'{self.base_url}/fixtures/{fixture_id}'
        params = self._get_params()

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks fixture error: {e}')
            return {'data': None, 'error': str(e)}

    def get_leagues(self):
        if not self.has_api_key:
            return {'data': []}

        url = f'{self.base_url}/leagues'
        params = self._get_params()

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks leagues error: {e}')
            return {'data': [], 'error': str(e)}

    def get_standings(self, season_id):
        if not self.has_api_key:
            return {'data': MOCK_STANDINGS}

        url = f'{self.base_url}/standings/seasons/{season_id}'
        params = self._get_params()

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks standings error: {e}')
            return {'data': MOCK_STANDINGS}

    def get_teams(self, page=1):
        if not self.has_api_key:
            return {'data': []}

        url = f'{self.base_url}/teams'
        params = self._get_params({'page': page})

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks teams error: {e}')
            return {'data': [], 'error': str(e)}

    def get_team_by_id(self, team_id):
        if not self.has_api_key:
            return {'data': None}

        url = f'{self.base_url}/teams/{team_id}'
        params = self._get_params()

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks team error: {e}')
            return {'data': None, 'error': str(e)}


sportmonks_service = SportmonksService()
