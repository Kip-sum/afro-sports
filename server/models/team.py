from datetime import datetime
from app import db


class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.String(50), unique=True, index=True)
    name = db.Column(db.String(150), nullable=False)
    short_name = db.Column(db.String(50))
    logo = db.Column(db.String(500))
    country = db.Column(db.String(100))
    sport = db.Column(db.String(50), default='football')
    league = db.Column(db.String(150))
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    home_matches = db.relationship('Match', foreign_keys='Match.home_team_id', backref='home_team', lazy='dynamic')
    away_matches = db.relationship('Match', foreign_keys='Match.away_team_id', backref='away_team', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'name': self.name,
            'shortName': self.short_name,
            'logo': self.logo,
            'country': self.country,
            'sport': self.sport,
            'league': self.league,
        }
