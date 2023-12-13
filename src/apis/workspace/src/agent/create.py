from flask import Blueprint, jsonify, request
from src.routes.routes import routes
from src.datasets.db import supabase


# Use the same key as in the routes.py dictionary
base = "create"
create_bp = Blueprint(base, __name__)


@create_bp.route(routes[base]["base"], methods=routes[base]["methods"])
def create_agent():
    print("create agent route")
    # Get the message info from the request
    data = request.get_json()
    print("data: ", data)

    # call create_agent function
    # the create_agent function will create an agent and insert it into the database
    # the create_agent function will return a uuid of the agent

    agent_uuid = supabase.rpc('create_agent', { 'agent_metadata': data["metadata"],'agent_name': data["name"], 'agent_specialization': data["specialization"]}).execute()
    print("DATABASE RESPONSE: ", agent_uuid)


    return jsonify({"message": "agent created successfully"})

