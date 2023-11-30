import requests
from supabase import create_client, Client
from src.config import SUPABASE_API_URL, SUPABASE_ANON_KEY

supabase: Client = create_client(SUPABASE_API_URL, SUPABASE_ANON_KEY)
print("Instantiated supabase client: ", supabase)
headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Content-Type": "application/json",  # Adjust content type if needed
}

def post_supabase(path: str, data: dict):
    response = requests.post(SUPABASE_API_URL + '/auth/v1' + path, json=data, headers=headers)
    return response

    try:
        # Make the HTTP POST request to Supabase for authentication
        response = requests.post(SUPABASE_API_URL + '/auth/v1' + path, json=data, headers=headers)

        if response.status_code == 200:
            return response
        else:
            # Authentication failed
            error_message = response_data.get('error_description', 'Authentication failed.')
            return jsonify({"error": error_message}), response.status_code

    except requests.exceptions.RequestException as e:
        # Handle request error
        return jsonify({"error": "Request to Supabase failed"}), 500
