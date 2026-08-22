from flask import Blueprint, jsonify, request

from app import db
from models.team import Team
from models.league import League
from services.sports_api import sportmonks_service

teams_bp = Blueprint('teams', __name__)


@teams_bp.route('/teams', methods=['GET'])
def get_teams():
    page = request.args.get('page', 1, type=int)
    league_id = request.args.get('leagueId')
    sport = request.args.get('sport')

    query = Team.query
    if league_id:
        query = query.filter_by(league_id=league_id)
    if sport:
        query = query.filter_by(sport=sport)

    teams = query.order_by(Team.name).paginate(page=page, per_page=30, error_out=False)
    return jsonify({
        'teams': [t.to_dict() for t in teams.items],
        'total': teams.total,
        'page': teams.page,
        'pages': teams.pages,
    })


@teams_bp.route('/teams/<int:team_id>', methods=['GET'])
def get_team(team_id):
    team = Team.query.get(team_id)
    if not team:
        return jsonify({'error': 'Team not found'}), 404
    return jsonify({'team': team.to_dict()})


@teams_bp.route('/teams/<int:team_id>/players', methods=['GET'])
def get_team_players(team_id):
    team = Team.query.get(team_id)
    if not team:
        return jsonify({'error': 'Team not found'}), 404
    return jsonify({'players': []})


@teams_bp.route('/teams/league/<int:league_id>', methods=['GET'])
def get_teams_by_league(league_id):
    teams = Team.query.filter_by(league_id=league_id).order_by(Team.name).all()
    return jsonify({'teams': [t.to_dict() for t in teams]})
