from datetime import datetime
from app import db


class League(db.Model):
    __tablename__ = 'leagues'

    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.String(50), unique=True, index=True)
    name = db.Column(db.String(150), nullable=False)
    logo = db.Column(db.String(500))
    country = db.Column(db.String(100))
    sport = db.Column(db.String(50), default='football')
    season = db.Column(db.String(50))
    teams_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    matches = db.relationship('Match', backref='league', lazy='dynamic')
    teams = db.relationship('Team', backref='league_ref', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'name': self.name,
            'logo': self.logo,
            'country': self.country,
            'sport': self.sport,
            'season': self.season,
            'teamsCount': self.teams_count,
        }
