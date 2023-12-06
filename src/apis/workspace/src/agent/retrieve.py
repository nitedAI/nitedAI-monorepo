from flask import Flask, Blueprint, jsonify, request
from src.datasets.db import supabase
from src.routes.routes import routes
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.memory import VectorStoreRetrieverMemory
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
from langchain.vectorstores import SupabaseVectorStore
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
import tempfile

embeddings = OpenAIEmbeddings()

import os
from dotenv import load_dotenv
import openai
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Blueprint and routing details
base = "retrieve"
retrieve_bp = Blueprint(base, __name__)

@retrieve_bp.route(routes[base]["base"], methods=routes[base]["methods"])
def retrieval_agent():
    try:
        # Get the message info from the request
        data = request.get_json()
        print("data: ", data)
        channel_id = data.get("channel_id")
        user_message = data.get("message")
        participant_uuid = data.get("agent_id")

        # Get conversation history from database
        message_data_response = supabase.rpc('get_last_n_messages_by_channel_id', {'channel_uuid': data["channel_id"], 'last_n_messages': 15}).execute()
        print("DATABASE RESPONSE: ", message_data_response)
        message_data_list = message_data_response.data

        #next we need to save the messages locally to calculate vectors
        #create a temporary file to store the messages
        with tempfile.NamedTemporaryFile(mode='w', delete=False) as f:
            for message in message_data_list:
                f.write(message['content'] + "\n")
            temp_filename = f.name
        
        #load and parse docs
        loader = TextLoader(temp_filename)
        documents = loader.load()
        text_splitter = CharacterTextSplitter(chunk_size=30, chunk_overlap=0)
        docs = text_splitter.split_documents(documents)

        print("docs: ", docs)

        #initialize the vector store
        vector_store = SupabaseVectorStore.from_documents(
            docs,
            embeddings,
            client=supabase,
            table_name="documents",
            query_name="match_documents",
            chunk_size=500,
        )

        #initialize the query vector
        
        matched_docs = vector_store.similarity_search(data["message"])
        print("AI Response: "+ matched_docs[0].page_content)

        os.remove(temp_filename)

        #insert the AI response into the database
        supabase.rpc('insert_message', {
            'channel_uuid': channel_id,
            'participant_uuid': participant_uuid,
            'message_content': matched_docs[0].page_content,
            'is_agent': True
        }).execute()

        return jsonify({"message": "agent responded successfully",
                        "response": matched_docs[0].page_content})
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Error retrieving agent response"}), 500






