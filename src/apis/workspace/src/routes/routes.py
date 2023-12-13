routes = {
    "workspace": {
        "name": "get_workspace",
        "base": "/workspace",
        "params": "/<int:workspace_id>",
        "methods": ["GET"]
    },
    "user": {
        "name": "get_user",
        "base": "/user",
        "params": "/<int:user_id>",
        "methods": ["GET"]
    },
    "login": {
        "name": "login",
        "base": "/auth/login",
        "params": "",
        "methods": ["POST"],
        "endpoint": "/token?grant_type=password"
    },
    #add an entry for a new route for an agent response, built with the same structure as the other routes
    "response": {
        "name": "response",
        "base": "/agent/response",
        "params": "",
        "methods": ["POST"]
    },
    "create": {
        "name": "create_agent",
        "base": "/agent/create",
        "params": "",
        "methods": ["POST"]
    },
    "retrieve": {
        "name": "retrieve_agent",
        "base": "/agent/retrieve",
        "params": "",
        "methods": ["POST"]
    },
}

for route in routes:
    routes[route]["path"] = routes[route]["base"] + routes[route]["params"]
