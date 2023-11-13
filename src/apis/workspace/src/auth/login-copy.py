from flask import Blueprint, jsonify, request
from src.datasets.db import post_supabase
from src.routes.routes import routes

base = "login"
login_bp = Blueprint(base, __name__)

@login_bp.route(routes[base]["path"], methods=['POST'])
def login():
    # Parse the request payload
    payload = request.json
    print(payload)
    email = payload.get('email')
    password = payload.get('password')

    # Prepare the request payload
    data = {
        "email": email,
        "password": password
    }

    # Make the HTTP POST request to Supabase for authentication
    response = post_supabase(routes[base]["endpoint"], data)
    response_data = response.json()

    # Authentication successful
    access_token = response_data.get('access_token')
    user_data = response_data.get('user', {})

    response_data = {
        "accessToken": access_token,
        "user": {
            "id": user_data.get('id', ''),
            "email": user_data.get('email', ''),
            # Add other fields as needed
        }
    }
    return jsonify(response_data), 200
