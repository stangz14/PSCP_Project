'''For development only. DO NOT USE IN PRODUCTION'''
from GetSetGoal import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0")