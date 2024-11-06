from flask import Flask, render_template, Blueprint, url_for, request, session, redirect, jsonify
from dotenv import load_dotenv
import os
from . import google
from . import db

load_dotenv()

users = Blueprint('users', __name__)

@users.route('/login')
def login():
    """function display login page"""
    return render_template('auth/login.html')

@users.route('/login/auth')
def auth():
    """function for authorized"""
    return google.authorize(callback=url_for('users.authorized', _external=True))

@users.route(os.getenv('REDIRECT_URI'))
def authorized():
    """function authorized"""
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )

    session['google_token'] = (response['access_token'], '')
    user_info = google.get('userinfo')
    user_data = user_info.data

    # Check if user already exists in MongoDB
    existing_user = db.users.find_one({'email': user_data['email']})
    if existing_user is None:
        # Add user to MongoDB
        user_id = db.users.insert_one({
            'name': user_data['name'],
            'email': user_data['email'],
            'picture': user_data['picture'],
            'google_id': user_data['id'],
            'level' : 1,
            'exp' : 0,
            'avatar' : 0
        }).inserted_id
        print(f"User added to MongoDB with id: {user_id}")
    else:
        print(f"User already exists in MongoDB with email: {user_data['email']}")

    return redirect(url_for('index'))

@google.tokengetter
def get_google_oauth_token():
    """function get Token"""
    return session.get('google_token')

@users.route('/logout')
def logout():
    """function logout from Website"""
    session.pop('google_token', None)
    return redirect(url_for('index'))


@users.route('/update_avatar', methods=['POST'])
def update_avatar():
    """function for update avatar to database"""
    if 'google_token' not in session:
        return {'error': 'User not authenticated'}, 403
    
    # Retrieve the avatar index from the request
    avatar_idx = request.json.get('avatar')
    user_info = google.get('userinfo')
    user_data = user_info.data
    
    # Update the user's avatar in the database
    db.users.update_one(
        {'email': user_data['email']},  # Use the user's email as an identifier
        {'$set': {'avatar': avatar_idx}}
    )
    
    return {'success': True, 'avatar': avatar_idx}


@users.route('/getcalendar', methods=['GET'])
def get_calendar():
    """function get calendar from google"""
    if 'google_token' not in session:
        return {'error': 'User not authenticated'}, 403
    events = google.get('https://www.googleapis.com/calendar/v3/calendars/primary/events').data
    return jsonify(events.get('items', []))


@users.route('/update_player_level', methods=['POST'])
def update_level():
    """funciton for update userlevel"""
    if 'google_token' not in session:
        return {'error': 'User not authenticated'}, 403
    
    # Retrieve the playerLevel and Exp from the request
    level = request.json.get('level')
    exp = request.json.get('exp')
    user_info = google.get('userinfo')
    user_data = user_info.data
    
    # Update the user's avatar in the database
    db.users.update_one(
        {'email': user_data['email']},  # Use the user's email as an identifier
        {'$set': {'level': level, 'exp' : exp}}
    )
    
    return {'success': True, 'level': level, 'exp': exp}