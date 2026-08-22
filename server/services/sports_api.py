import requests
from flask import current_app


class SportmonksService:
    def __init__(self):
        self.api_key = None
        self.base_url = None

    def _get_headers(self):
        return {
            'Authorization': self.api_key or current_app.config['SPORTMONKS_API_KEY'],
        }

    def _get_params(self, extra=None):
        params = {}
        if extra:
            params.update(extra)
        return params

    @property
    def api_key(self):
        return current_app.config.get('SPORTMONKS_API_KEY', '')

    @property
    def base_url(self):
        return current_app.config.get('SPORTMONKS_BASE_URL', 'https://api.sportmonks.com/v3/football')

    def get_livescores(self, inplay_only=False):
        endpoint = '/livescores/inplay' if inplay_only else '/livescores'
        url = f'{self.base_url}{endpoint}'
        params = self._get_params()

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks livescores error: {e}')
            return {'data': [], 'error': str(e)}

    def get_fixtures_by_date(self, date_str):
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
        url = f'{self.base_url}/standings/seasons/{season_id}'
        params = self._get_params()

        try:
            response = requests.get(url, headers=self._get_headers(), params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            current_app.logger.error(f'Sportmonks standings error: {e}')
            return {'data': [], 'error': str(e)}

    def get_teams(self, page=1):
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
