from flask import Blueprint, jsonify, request

from app import db
from models.league import League
from services.sports_api import sportmonks_service

leagues_bp = Blueprint('leagues', __name__)


@leagues_bp.route('/leagues', methods=['GET'])
def get_leagues():
    sport = request.args.get('sport')

    query = League.query
    if sport:
        query = query.filter_by(sport=sport)

    leagues = query.order_by(League.name).all()
    return jsonify({'leagues': [l.to_dict() for l in leagues]})


@leagues_bp.route('/leagues/<int:league_id>', methods=['GET'])
def get_league(league_id):
    league = League.query.get(league_id)
    if not league:
        return jsonify({'error': 'League not found'}), 404
    return jsonify({'league': league.to_dict()})


@leagues_bp.route('/standings/<int:season_id>', methods=['GET'])
def get_standings(season_id):
    data = sportmonks_service.get_standings(season_id)
    if 'error' in data and not data.get('data'):
        return jsonify({'standings': [], 'error': data['error']}), 503
    return jsonify({'standings': data.get('data', [])})
