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
}

for route in routes:
    routes[route]["path"] = routes[route]["base"] + routes[route]["params"]
