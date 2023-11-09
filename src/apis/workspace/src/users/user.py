from flask import Blueprint, jsonify

from src.routes.routes import routes
from src.datasets.db import supabase

base = "user"
user_bp = Blueprint(base, __name__)

# Define sample user data
user_data = {
    1: {"id": 1, "name": "User 1"},
    2: {"id": 2, "name": "User 2"},
}

@user_bp.route(routes[base]["path"], methods=['GET'])
def get_user(user_id):
    if user_id in user_data:
        user = user_data[user_id]
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404
