from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
import re

from app import db
from models.news import News
from models.user import User

news_bp = Blueprint('news', __name__)


def _slugify(text):
    slug = re.sub(r'[^\w\s-]', '', text.lower())
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'^-+|-+$', '', slug)
    return slug


@news_bp.route('/news', methods=['GET'])
def get_news():
    page = request.args.get('page', 1, type=int)
    category = request.args.get('category')
    featured = request.args.get('featured')
    breaking = request.args.get('breaking')

    query = News.query.filter_by(published=True)

    if category:
        query = query.filter_by(category=category)
    if featured:
        query = query.filter_by(is_featured=True)
    if breaking:
        query = query.filter_by(is_breaking=True)

    news = query.order_by(News.created_at.desc()).paginate(page=page, per_page=20, error_out=False)

    return jsonify({
        'news': [n.to_dict() for n in news.items],
        'total': news.total,
        'page': news.page,
        'pages': news.pages,
    })


@news_bp.route('/news/featured', methods=['GET'])
def get_featured_news():
    articles = News.query.filter_by(published=True, is_featured=True).order_by(News.created_at.desc()).limit(5).all()
    return jsonify({'news': [n.to_dict() for n in articles]})


@news_bp.route('/news/breaking', methods=['GET'])
def get_breaking_news():
    articles = News.query.filter_by(published=True, is_breaking=True).order_by(News.created_at.desc()).limit(5).all()
    return jsonify({'news': [n.to_dict() for n in articles]})


@news_bp.route('/news/<string:slug>', methods=['GET'])
def get_news_by_slug(slug):
    article = News.query.filter_by(slug=slug).first()
    if not article:
        return jsonify({'error': 'Article not found'}), 404
    return jsonify({'news': article.to_dict()})


@news_bp.route('/news/category/<string:category>', methods=['GET'])
def get_news_by_category(category):
    articles = News.query.filter_by(published=True, category=category).order_by(News.created_at.desc()).limit(20).all()
    return jsonify({'news': [n.to_dict() for n in articles]})


@news_bp.route('/news', methods=['POST'])
@jwt_required()
def create_news():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    title = data.get('title', '').strip()
    content = data.get('content', '').strip()

    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), 400

    slug = _slugify(title)
    existing = News.query.filter_by(slug=slug).first()
    if existing:
        slug = f'{slug}-{datetime.utcnow().strftime("%Y%m%d%H%M%S")}'

    user_id = get_jwt_identity()

    article = News(
        title=title,
        slug=slug,
        content=content,
        excerpt=data.get('excerpt'),
        image=data.get('image'),
        category=data.get('category'),
        author_id=user_id,
        published=data.get('published', False),
        is_featured=data.get('is_featured', False),
        is_breaking=data.get('is_breaking', False),
    )

    db.session.add(article)
    db.session.commit()

    return jsonify({'news': article.to_dict(), 'message': 'Article created successfully'}), 201


@news_bp.route('/news/<int:news_id>', methods=['PATCH'])
@jwt_required()
def update_news(news_id):
    article = News.query.get(news_id)
    if not article:
        return jsonify({'error': 'Article not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    if 'title' in data:
        article.title = data['title'].strip()
    if 'content' in data:
        article.content = data['content'].strip()
    if 'excerpt' in data:
        article.excerpt = data['excerpt']
    if 'image' in data:
        article.image = data['image']
    if 'category' in data:
        article.category = data['category']
    if 'published' in data:
        article.published = data['published']
    if 'is_featured' in data:
        article.is_featured = data['is_featured']
    if 'is_breaking' in data:
        article.is_breaking = data['is_breaking']

    db.session.commit()
    return jsonify({'news': article.to_dict(), 'message': 'Article updated successfully'})


@news_bp.route('/news/<int:news_id>', methods=['DELETE'])
@jwt_required()
def delete_news(news_id):
    article = News.query.get(news_id)
    if not article:
        return jsonify({'error': 'Article not found'}), 404

    db.session.delete(article)
    db.session.commit()
    return jsonify({'message': 'Article deleted successfully'})
