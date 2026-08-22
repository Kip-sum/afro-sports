from flask import Blueprint, jsonify, request
from datetime import datetime, date

from app import db
from models.match import Match
from models.team import Team
from services.sports_api import sportmonks_service

matches_bp = Blueprint('matches', __name__)


@matches_bp.route('/live', methods=['GET'])
def get_live_scores():
    data = sportmonks_service.get_livescores()
    if 'error' in data and not data.get('data'):
        return jsonify({'liveScores': [], 'error': data['error']}), 503

    matches = _transform_livescores(data.get('data', []))
    return jsonify({'liveScores': matches})


@matches_bp.route('/matches', methods=['GET'])
def get_matches():
    date_str = request.args.get('date')
    sport = request.args.get('sport')
    league = request.args.get('league')

    if date_str == 'today':
        date_str = date.today().isoformat()

    if date_str:
        data = sportmonks_service.get_fixtures_by_date(date_str)
        if 'error' in data and not data.get('data'):
            return jsonify({'matches': [], 'error': data['error']}), 503
        matches = _transform_fixtures(data.get('data', []))
    else:
        query = Match.query
        if sport:
            query = query.filter_by(sport=sport)
        if league:
            query = query.join(Match.league_ref).filter_by(name=league)
        matches = [m.to_dict() for m in query.order_by(Match.start_time.desc()).limit(50).all()]

    return jsonify({'matches': matches})


@matches_bp.route('/matches/today', methods=['GET'])
def get_today_matches():
    today = date.today().isoformat()
    data = sportmonks_service.get_fixtures_by_date(today)
    if 'error' in data and not data.get('data'):
        return jsonify({'matches': [], 'error': data['error']}), 503
    matches = _transform_fixtures(data.get('data', []))
    return jsonify({'matches': matches})


@matches_bp.route('/matches/upcoming', methods=['GET'])
def get_upcoming_matches():
    matches = Match.query.filter(Match.status == 'upcoming').order_by(Match.start_time.asc()).limit(20).all()
    return jsonify({'matches': [m.to_dict() for m in matches]})


@matches_bp.route('/matches/recent', methods=['GET'])
def get_recent_matches():
    matches = Match.query.filter(Match.status == 'finished').order_by(Match.start_time.desc()).limit(20).all()
    return jsonify({'matches': [m.to_dict() for m in matches]})


@matches_bp.route('/matches/<int:match_id>', methods=['GET'])
def get_match(match_id):
    match = Match.query.get(match_id)
    if not match:
        data = sportmonks_service.get_fixture_by_id(str(match_id))
        if data.get('data'):
            return jsonify({'match': data['data']})
        return jsonify({'error': 'Match not found'}), 404
    return jsonify({'match': match.to_dict()})


@matches_bp.route('/matches/team/<int:team_id>', methods=['GET'])
def get_team_matches(team_id):
    matches = Match.query.filter(
        (Match.home_team_id == team_id) | (Match.away_team_id == team_id)
    ).order_by(Match.start_time.desc()).limit(20).all()
    return jsonify({'matches': [m.to_dict() for m in matches]})


def _get_venue_name(item):
    venue = item.get('venue')
    if isinstance(venue, str):
        return venue
    if isinstance(venue, dict):
        return venue.get('name')
    return None


def _transform_livescores(raw_matches):
    matches = []
    for item in raw_matches:
        participants = item.get('participants', [])
        if participants:
            home_team = _extract_participant(item, 'home')
            away_team = _extract_participant(item, 'away')
            home_score = _extract_score(item, 'home')
            away_score = _extract_score(item, 'away')
        else:
            home_team = item.get('homeTeam', {'name': 'Unknown', 'shortName': 'TBD', 'logo': None})
            away_team = item.get('awayTeam', {'name': 'Unknown', 'shortName': 'TBD', 'logo': None})
            home_score = item.get('homeScore', 0)
            away_score = item.get('awayScore', 0)

        match = {
            'id': item.get('id'),
            'external_id': str(item.get('id')),
            'homeTeam': home_team,
            'awayTeam': away_team,
            'league': _extract_league(item),
            'startTime': item.get('starting_at'),
            'status': 'live',
            'homeScore': home_score,
            'awayScore': away_score,
            'minute': item.get('minute', ''),
            'venue': _get_venue_name(item),
            'sport': 'football',
        }
        matches.append(match)
    return matches


def _transform_fixtures(raw_matches):
    matches = []
    for item in raw_matches:
        match = {
            'id': item.get('id'),
            'external_id': str(item.get('id')),
            'homeTeam': _extract_participant(item, 'home'),
            'awayTeam': _extract_participant(item, 'away'),
            'league': _extract_league(item),
            'startTime': item.get('starting_at'),
            'status': _map_status(item.get('state', {}).get('name') if item.get('state') else None),
            'homeScore': _extract_score(item, 'home'),
            'awayScore': _extract_score(item, 'away'),
            'minute': item.get('minute', ''),
            'venue': _get_venue_name(item),
            'sport': 'football',
        }
        matches.append(match)
    return matches


def _extract_participant(item, side):
    participants = item.get('participants', [])
    for p in participants:
        if p.get('meta', {}).get('location') == side:
            country = p.get('country')
            country_name = country if isinstance(country, str) else (country.get('name') if isinstance(country, dict) else None)
            return {
                'id': p.get('id'),
                'name': p.get('name', ''),
                'shortName': p.get('short_name', p.get('name', '')),
                'logo': p.get('image_path', ''),
                'country': country_name,
            }
    return {'name': 'Unknown', 'shortName': 'TBD', 'logo': None}


def _extract_league(item):
    league = item.get('league', {})
    if isinstance(league, str):
        league = {'name': league}
    country = league.get('country')
    country_name = country if isinstance(country, str) else (country.get('name') if isinstance(country, dict) else None)
    return {
        'id': league.get('id'),
        'name': league.get('name', ''),
        'logo': league.get('image_path', ''),
        'country': country_name,
    }


def _extract_score(item, side):
    scores = item.get('scores', [])
    for s in scores:
        if s.get('description') == 'CURRENT' and s.get('score', {}).get('participant') == side:
            return s.get('score', {}).get('goals', 0)
    return 0


def _map_status(state_name):
    if not state_name:
        return 'upcoming'
    state_map = {
        'NS': 'upcoming',
        'LIVE': 'live',
        'HT': 'half-time',
        'FT': 'finished',
        'ET': 'extra-time',
        'PEN': 'penalties',
        'CANCL': 'cancelled',
        'POSTP': 'postponed',
        'INT': 'interrupted',
        'ABAN': 'abandoned',
        'SUSP': 'suspended',
    }
    return state_map.get(state_name, 'upcoming')
