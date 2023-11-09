import os
from flask import Flask
from flask_cors import CORS
from src.routes.routes import routes
# from src.workspace.workspace import workspace_bp
# from src.users.user import user_bp
from src.auth.login import login_bp
# from src.auth.logout import logout_bp

url_prefix = os.environ.get("WORKSPACES_API_URL_PREFIX", "/v1/api")

app = Flask(__name__)
CORS(app, resources={r"/v1/api/*": {"origins": "*"}})

# app.register_blueprint(workspace_bp, url_prefix=url_prefix)
# app.register_blueprint(user_bp, url_prefix=url_prefix)
app.register_blueprint(login_bp, url_prefix=url_prefix)
# app.register_blueprint(logout_bp, url_prefix=url_prefix)

if __name__ == '__main__':
    app.run(debug=True)
