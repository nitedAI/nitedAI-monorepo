from flask import Blueprint, jsonify
from src.routes.routes import routes

# Use the same key as in the routes.py dictionary
base = "workspace"
workspace_bp = Blueprint(base, __name__)

# Define sample workspace data
workspace_data = {
    1: {"id": 1, "name": "Workspace 1"},
    2: {"id": 2, "name": "Workspace 2"},
}

@workspace_bp.route(routes[base]["path"], methods=routes[base]["methods"])
def get_workspace(workspace_id):
    if workspace_id in workspace_data:
        workspace = workspace_data[workspace_id]
        return jsonify(workspace)
    else:
        return jsonify({"error": "Workspace not found"}), 404
