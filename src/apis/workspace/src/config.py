import os
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())
#use this to get the environment variables
SUPABASE_API_URL: str = os.environ.get("VITE_SUPABASE_API_URL")
SUPABASE_ANON_KEY: str = os.environ.get("VITE_SUPABASE_ANON_KEY")
