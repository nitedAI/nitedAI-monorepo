from flask import Blueprint, jsonify, request
from ....datasets.db import supabase

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/ai/respond', methods=['POST'])
def ai_respond():
    """
    This route receives conversation history and returns the AI agent's response.
    :return: A JSON response from the AI agent.
    """
    try:
        # Extract conversation history from the request
        data = request.json
        print("data: ", data)

        #db_data = supabase.rpc('get_messages_by')

        #conversation_history = data.get('history')

        # Invoke AI agent
        ai_response = invoke_ai_agent(conversation_history)

        # Formulate and send response
        return jsonify({"response": ai_response}), 200
    except Exception as e:
        # Error handling
        return jsonify({"error": str(e)}), 500
