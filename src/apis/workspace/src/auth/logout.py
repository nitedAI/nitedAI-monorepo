from flask import Blueprint, jsonify, request
from src.datasets.db import supabase

base = "logout"
logout_bp = Blueprint(base, __name__)

@logout_bp.route('/logout', methods=['POST'])
def logout():
    res = supabase.auth.sign_out()
    return jsonify(res), 200
