import os
import sys
import re
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from models.user import User
from models.league import League
from models.team import Team
from models.match import Match
from models.news import News


def seed_database():
    app = create_app('development')

    with app.app_context():
        db.drop_all()
        db.create_all()

        print('Creating admin user...')
        admin = User(
            name='Admin',
            email='admin@afrosports.com',
            password_hash=generate_password_hash('admin12345'),
            role='admin',
        )
        db.session.add(admin)
        db.session.flush()

        print('Creating editor user...')
        editor = User(
            name='Editor',
            email='editor@afrosports.com',
            password_hash=generate_password_hash('editor12345'),
            role='editor',
        )
        db.session.add(editor)
        db.session.flush()

        print('Creating leagues...')
        leagues_data = [
            {'name': 'Premier League', 'country': 'England', 'sport': 'football', 'season': '2025/26'},
            {'name': 'Kenya Premier League', 'country': 'Kenya', 'sport': 'football', 'season': '2025'},
            {'name': 'UEFA Champions League', 'country': 'Europe', 'sport': 'football', 'season': '2025/26'},
            {'name': 'La Liga', 'country': 'Spain', 'sport': 'football', 'season': '2025/26'},
            {'name': 'NBA', 'country': 'USA', 'sport': 'basketball', 'season': '2025/26'},
            {'name': 'Rugby Championship', 'country': 'International', 'sport': 'rugby', 'season': '2025'},
        ]

        leagues = []
        for l_data in leagues_data:
            league = League(**l_data)
            db.session.add(league)
            leagues.append(league)
        db.session.flush()

        print('Creating teams...')
        teams_data = [
            {'name': 'Arsenal', 'short_name': 'ARS', 'country': 'England', 'sport': 'football', 'league': 'Premier League', 'league_id': leagues[0].id, 'logo': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg'},
            {'name': 'Chelsea', 'short_name': 'CHE', 'country': 'England', 'sport': 'football', 'league': 'Premier League', 'league_id': leagues[0].id, 'logo': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg'},
            {'name': 'Manchester City', 'short_name': 'MCI', 'country': 'England', 'sport': 'football', 'league': 'Premier League', 'league_id': leagues[0].id, 'logo': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg'},
            {'name': 'Liverpool', 'short_name': 'LIV', 'country': 'England', 'sport': 'football', 'league': 'Premier League', 'league_id': leagues[0].id, 'logo': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg'},
            {'name': 'Gor Mahia', 'short_name': 'Gor Mahia', 'country': 'Kenya', 'sport': 'football', 'league': 'Kenya Premier League', 'league_id': leagues[1].id, 'logo': None},
            {'name': 'AFC Leopards', 'short_name': 'AFC Leop', 'country': 'Kenya', 'sport': 'football', 'league': 'Kenya Premier League', 'league_id': leagues[1].id, 'logo': None},
            {'name': 'Al Ahly', 'short_name': 'Al Ahly', 'country': 'Egypt', 'sport': 'football', 'league': 'Egyptian Premier League', 'logo': None},
            {'name': 'TP Mazembe', 'short_name': 'TP Maz', 'country': 'DR Congo', 'sport': 'football', 'league': 'Linafoot', 'logo': None},
        ]

        teams = []
        for t_data in teams_data:
            team = Team(**t_data)
            db.session.add(team)
            teams.append(team)
        db.session.flush()

        print('Creating matches...')
        now = datetime.utcnow()
        matches_data = [
            {'home_team_id': teams[0].id, 'away_team_id': teams[1].id, 'league_id': leagues[0].id, 'start_time': now + timedelta(hours=2), 'status': 'upcoming', 'venue': 'Emirates Stadium', 'sport': 'football'},
            {'home_team_id': teams[2].id, 'away_team_id': teams[3].id, 'league_id': leagues[0].id, 'start_time': now + timedelta(hours=4), 'status': 'upcoming', 'venue': 'Etihad Stadium', 'sport': 'football'},
            {'home_team_id': teams[0].id, 'away_team_id': teams[2].id, 'league_id': leagues[3].id, 'start_time': now + timedelta(days=1), 'status': 'upcoming', 'venue': 'Santiago Bernabéu', 'sport': 'football'},
            {'home_team_id': teams[4].id, 'away_team_id': teams[5].id, 'league_id': leagues[1].id, 'start_time': now + timedelta(hours=1), 'status': 'upcoming', 'venue': 'Kasarani Stadium', 'sport': 'football'},
            {'home_team_id': teams[0].id, 'away_team_id': teams[2].id, 'league_id': leagues[0].id, 'start_time': now - timedelta(days=1), 'status': 'finished', 'home_score': 2, 'away_score': 1, 'venue': 'Emirates Stadium', 'sport': 'football'},
            {'home_team_id': teams[1].id, 'away_team_id': teams[3].id, 'league_id': leagues[0].id, 'start_time': now - timedelta(days=2), 'status': 'finished', 'home_score': 0, 'away_score': 0, 'venue': 'Stamford Bridge', 'sport': 'football'},
        ]

        for m_data in matches_data:
            match = Match(**m_data)
            db.session.add(match)

        print('Creating news articles...')
        news_data = [
            {
                'title': 'Kenya Prepares for AFCON Qualifier Showdown',
                'content': '<p>The Harambee Stars are gearing up for a crucial Africa Cup of Nations qualifier this weekend. Coach Francis Kimanzi has named a strong squad featuring both local-based and European-based players.</p><p>The team has been in camp for the past week, working on tactics and fitness ahead of the important fixture. Kenya needs a win to keep their qualification hopes alive.</p>',
                'excerpt': 'The Harambee Stars are gearing up for a crucial Africa Cup of Nations qualifier this weekend.',
                'image': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
                'category': 'Football',
                'author_id': admin.id,
                'published': True,
                'is_featured': True,
                'is_breaking': True,
            },
            {
                'title': 'Gor Mahia Announce New Signing Ahead of KPL Season',
                'content': '<p>Kenyan Premier League champions Gor Mahia have completed the signing of a prolific striker from rivals AFC Leopards. The player, who scored 15 goals last season, has penned a two-year deal at the 19-time champions.</p><p>Football Kenya Federation has confirmed the transfer after both clubs agreed on compensation terms.</p>',
                'excerpt': 'Kenyan Premier League champions Gor Mahia have completed the signing of a prolific striker.',
                'image': 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
                'category': 'Football',
                'author_id': editor.id,
                'published': True,
                'is_breaking': True,
            },
            {
                'title': 'Premier League Weekend Preview: Title Race Heats Up',
                'content': '<p>This Premier League weekend promises drama as the title race intensifies. League leaders Arsenal face a tricky away trip, while Manchester City host Liverpool in what could be a season-defining clash.</p><p>We preview all the key fixtures and what to expect from Matchday 28.</p>',
                'excerpt': 'This Premier League weekend promises drama as the title race intensifies.',
                'image': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
                'category': 'Football',
                'author_id': admin.id,
                'published': True,
            },
            {
                'title': 'NBA Playoffs: Conference Finals Set',
                'content': '<p>The NBA playoff picture is now clear with both Conference Finals set to begin this week. The Eastern Conference will see a rematch of last years final four.</p><p>Meanwhile out West, an unexpected finalist has emerged after a thrilling seven-game series.</p>',
                'excerpt': 'The NBA playoff picture is now clear with both Conference Finals set to begin.',
                'image': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
                'category': 'Basketball',
                'author_id': editor.id,
                'published': True,
            },
            {
                'title': 'Athletics: Kenyan Dominates Berlin Marathon',
                'content': '<p>Kenya continued its marathon dominance as its athlete stormed to victory at the Berlin Marathon, clocking an impressive time that puts him in contention for the world record.</p><p>The win marks the fourth consecutive year a Kenyan athlete has won the prestigious race.</p>',
                'excerpt': 'Kenya continued its marathon dominance at the Berlin Marathon.',
                'image': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
                'category': 'Athletics',
                'author_id': admin.id,
                'published': True,
            },
            {
                'title': 'Champions League Draw: Group Stage Revealed',
                'content': '<p>The UEFA Champions League group stage draw has been conducted in Monaco, setting up some mouth-watering fixtures. Defending champions Real Madrid have been drawn in a tough group alongside Bayern Munich and Napoli.</p>',
                'excerpt': 'The UEFA Champions League group stage draw has been conducted in Monaco.',
                'image': 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
                'category': 'Football',
                'author_id': editor.id,
                'published': True,
                'is_featured': True,
            },
        ]

        for n_data in news_data:
            slug = re.sub(r'[^\w\s-]', '', n_data['title'].lower())
            slug = re.sub(r'[\s_]+', '-', slug).strip('-')
            slug = f"{slug}-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
            article = News(slug=slug, **n_data)
            db.session.add(article)

        db.session.commit()
        print('Database seeded successfully!')
        print(f'  - {User.query.count()} users')
        print(f'  - {League.query.count()} leagues')
        print(f'  - {Team.query.count()} teams')
        print(f'  - {Match.query.count()} matches')
        print(f'  - {News.query.count()} news articles')
        print('\nAdmin login: admin@afrosports.com / admin12345')
        print('Editor login: editor@afrosports.com / editor12345')


if __name__ == '__main__':
    seed_database()
