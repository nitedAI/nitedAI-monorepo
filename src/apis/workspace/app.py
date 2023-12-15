import os

from flask import Flask
from flask_cors import CORS
from src.routes.routes import routes
from src.agent.response import response_bp
from src.agent.create import create_bp
from src.agent.converse import converse_bp
from src.agent.retrieve import retrieve_bp

url_prefix = os.environ.get("WORKSPACES_API_URL_PREFIX", "/v1/api")

app = Flask(__name__)
CORS(app, resources={r"/v1/api/*": {"origins": "*"}})

app.register_blueprint(response_bp, url_prefix=url_prefix)
app.register_blueprint(create_bp, url_prefix=url_prefix)
app.register_blueprint(converse_bp, url_prefix=url_prefix)
app.register_blueprint(retrieve_bp, url_prefix=url_prefix)


if __name__ == '__main__':
    app.run(debug=True)
