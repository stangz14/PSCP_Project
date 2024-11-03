from flask import Flask, render_template


def create_app():
    app = Flask(__name__, template_folder='template')
    
    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/music')
    def music():
        return render_template('music.html')
    return app