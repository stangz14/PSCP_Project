from flask import Flask, render_template, jsonify, redirect, url_for, session, request
from flask_oauthlib.client import OAuth
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__,)
app.secret_key = 'SOME_KEY'

# Google OAuth configuration
oauth = OAuth(app)
google = oauth.remote_app(
    'google',
    consumer_key=os.getenv('GOOGLE_CLIENT_ID'),
    consumer_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    request_token_params={
        'scope': os.getenv('SCOPES'),
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

# MongoDB configuration
client = MongoClient(os.getenv('MONGODB'))
db = client['mydb']


def create_app():
    from .users import users

    app.register_blueprint(users, url_prefix='/')
    
    @app.route('/')
    def index():
        """main function for display homepage"""
        if 'google_token' in session:
            user_info = google.get('userinfo').data
            user_info = db.users.find_one({'email': user_info['email']})
            return render_template('index.html', user=user_info)
        return redirect(url_for('users.login'))
    
    @app.route('/calendar')
    def calendar():
        """main function for display calendarpage"""
        if 'google_token' in session:
            user_info = google.get('userinfo').data
            user_info = db.users.find_one({'email': user_info['email']})
            return render_template('calendar.html', user=user_info)
        return redirect(url_for('users.login'))
    

    return app

