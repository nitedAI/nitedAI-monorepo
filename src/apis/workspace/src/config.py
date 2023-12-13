import os
from dotenv import load_dotenv


load_dotenv()
#use this to get the environment variables
SUPABASE_API_URL: str = os.getenv("VITE_SUPABASE_API_URL")
SUPABASE_ANON_KEY: str = os.getenv("VITE_SUPABASE_ANON_KEY")
