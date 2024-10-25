from flask import Flask, render_template, request, jsonify
from pytube import Playlist
import yt_dlp


def create_app():
    app = Flask(__name__, template_folder='template')

    # Function to extract video URLs from a YouTube playlist
    def get_playlist_videos(playlist_url):
        try:
            playlist = Playlist(playlist_url)
            videos = [{'title': video.title, 'url': video.watch_url} for video in playlist.videos]
            return videos
        except Exception as e:
            print(f"Error fetching playlist: {e}")
            return []
    
    @app.route('/')
    def index():
        return render_template('index.html')
    # Endpoint to get playlist videos
    @app.route('/get_playlist', methods=['POST'])
    def get_playlist():
        data = request.json
        playlist_url = data.get('playlist_url')
        videos = get_playlist_videos(playlist_url)
        return jsonify({'videos': videos})

    # Endpoint to stream selected video audio
    @app.route('/stream', methods=['POST'])
    def stream():
        data = request.json
        video_url = data.get('video_url')
        
        # Extract audio URL using yt-dlp
        ydl_opts = {
            'format': 'bestaudio',
            'quiet': True,
            'extract_flat': True,
            'force_generic_extractor': True,
            'skip_download': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            audio_url = info['url']
        
        return jsonify({'audio_url': audio_url})
    return app