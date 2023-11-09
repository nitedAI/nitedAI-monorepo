from flask import Blueprint, jsonify, request
from src.datasets.db import supabase

base = "login"
login_bp = Blueprint(base, __name__)

@login_bp.route('/auth/login', methods=['POST'])
def login():
    # Parse the request payload
    payload = request.json
    email = payload.get('email')
    password = payload.get('password')


    # Perform authentication with Supabase
    auth_response = supabase.auth.sign_in_with_password({"email": email, "password": password})

    session = auth_response.session
    access_token = session.access_token

    if access_token is not None:
        # Extract necessary data
        user_data = auth_response.user
        user_id = user_data.id

        # Call the custom PostgreSQL function to get user data and workspaces
        response_data = supabase.rpc('get_user_data_and_workspaces', {'user_uuid': user_id}).execute()

        user_data = {
            'id': user_data.id,
            'email': user_data.email,
            **(response_data.data['user'] or {})
        }
        # Format the response data with access token
        response_data_with_token = {
            "accessToken": access_token,
            "user": user_data,
            "workspaces": response_data.data['workspaces']
        }

        # Send the response
        return jsonify(response_data_with_token), 200
    else:
        # Handle login error (e.g., user not found, incorrect password)
        return jsonify({"error": "Authentication failed.", "message": auth_response['error']['message']}), 401

