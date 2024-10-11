from flask import Flask, render_template, Blueprint, url_for, request, session, redirect
from dotenv import load_dotenv
import os
from . import google
from . import db

load_dotenv()

users = Blueprint('users', __name__)

@users.route('/login')
def login():
    return render_template('auth/login.html')

@users.route('/login/auth')
def auth():
    return google.authorize(callback=url_for('users.authorized', _external=True))

@users.route(os.getenv('REDIRECT_URI'))
def authorized():
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
            'avatar' : None
        }).inserted_id
        print(f"User added to MongoDB with id: {user_id}")
    else:
        print(f"User already exists in MongoDB with email: {user_data['email']}")

    return redirect(url_for('index'))

@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')

@users.route('/logout')
def logout():
    session.pop('google_token', None)
    return redirect(url_for('index'))