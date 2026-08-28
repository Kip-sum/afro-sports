import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import config_by_name

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')

    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)

    from routes.matches import matches_bp
    from routes.teams import teams_bp
    from routes.leagues import leagues_bp
    from routes.news import news_bp
    from routes.auth import auth_bp

    app.register_blueprint(matches_bp, url_prefix='/api')
    app.register_blueprint(teams_bp, url_prefix='/api')
    app.register_blueprint(leagues_bp, url_prefix='/api')
    app.register_blueprint(news_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    @app.route('/api/health')
    def health_check():
        return {'status': 'ok', 'service': 'Afro Sports API'}

    with app.app_context():
        from models import user, match, team, league, news

    return app
