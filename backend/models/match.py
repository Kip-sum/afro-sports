from datetime import datetime
from app import db


class Match(db.Model):
    __tablename__ = 'matches'

    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.String(50), unique=True, index=True)
    home_team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    away_team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'))
    start_time = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='upcoming')
    home_score = db.Column(db.Integer, default=0)
    away_score = db.Column(db.Integer, default=0)
    minute = db.Column(db.String(10))
    venue = db.Column(db.String(200))
    sport = db.Column(db.String(50), default='football')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'homeTeam': self.home_team.to_dict() if self.home_team else None,
            'awayTeam': self.away_team.to_dict() if self.away_team else None,
            'league': self.league.to_dict() if self.league else None,
            'startTime': self.start_time.isoformat() if self.start_time else None,
            'status': self.status,
            'homeScore': self.home_score,
            'awayScore': self.away_score,
            'minute': self.minute,
            'venue': self.venue,
            'sport': self.sport,
        }
