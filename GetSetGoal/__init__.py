from flask import Flask, render_template, redirect, url_for, session, request
from flask_oauthlib.client import OAuth
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__, template_folder='templates')
app.secret_key = 'SOME_KEY'

# Google OAuth configuration
oauth = OAuth(app)
google = oauth.remote_app(
    'google',
    consumer_key=os.getenv('GOOGLE_CLIENT_ID'),
    consumer_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    request_token_params={
        'scope': 'email profile',
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

# MongoDB configuration
client = MongoClient('mongodb://localhost:27017/')
db = client['mydb']

def create_app():
    """"""
    
    from .users import users

    app.register_blueprint(users, url_prefix='/')
    
    @app.route('/')
    def index():
        if 'google_token' in session:
            user_info = google.get('userinfo').data
            return render_template('index.html', user=user_info)
        return redirect(url_for('users.login'))
    
    return app