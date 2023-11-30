from flask import Flask, Blueprint, jsonify, request
from src.datasets.db import supabase
from openai import OpenAI
import uuid
import os

# Load environment variables
from dotenv import load_dotenv
load_dotenv()


# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Blueprint and routing details
base = "converse"
converse_bp = Blueprint(base, __name__)

# Function to check UUID via RPC
def check_uuid_via_rpc(uuid_value):
    response = supabase.rpc('check_uuid_belongs_to', {'input_uuid': uuid_value}).execute()
    return response.data

def check_if_agent(participant_uuid):
    try:
        response = supabase.rpc('is_agent', {'participant_uuid': participant_uuid}).execute()
    except Exception as e:
        return None    

    # Extract and return the data from the response
    return response.data

@converse_bp.route('/agent/converse', methods=['POST'])
def get_response():
    data = request.get_json()
    channel_id = data.get("channel_id")
    user_message = data.get("message")
    participant_uuid = data.get("participant_id")

    if not channel_id or not user_message or participant_uuid is None:
        return jsonify({"error": "Missing required information"}), 400

    is_agent = check_if_agent(participant_uuid)

    if is_agent is None:
        return jsonify({"error": "Error checking participant type"}), 500

    try:
        # Fetch the conversation history for the given channel from the database
        message_data_response = supabase.rpc('get_last_n_messages_by_channel_id', {
            'channel_uuid': channel_id,
            'last_n_messages': 15
        }).execute()

        messages = []
        for message in message_data_response.data:
            content = message.get("content")
            if content is None or not isinstance(content, str):
                continue
            messages.append({
                "role": message.get("role") or "system",
                "content": content
            })

        # Append the new user message
        messages.append({"role": "user", "content": user_message})

        # Send messages to OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150
        )

        ai_response = response.choices[0].message.content.strip()

        # Insert the AI response into the database
        supabase.rpc('insert_message', {
            'channel_uuid': channel_id,
            'participant_uuid': participant_uuid,
            'message_content': ai_response,
            'is_agent': True
        }).execute()

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing the request"}), 500

    return jsonify({"response": ai_response})


