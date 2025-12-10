from google import genai
from google.genai import types

# --- CONFIGURATION ---
# Replace with your ACTUAL project ID
PROJECT_ID = "vertex-ai-testing-2025-480305" 
LOCATION = "global"
# ---------------------

print(f"Initializing new Gen AI Client for project: {PROJECT_ID}...")

try:
    # 1. Initialize the new Client
    # Setting vertexai=True tells it to use your Google Cloud Project (Vertex AI) 
    # instead of the consumer API key.
    client = genai.Client(
        vertexai=True, 
        project=PROJECT_ID, 
        location=LOCATION
    )

    # 2. Generate Content
    print("Sending request to Gemini...")
    response = client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents="Hello! Please tell me a fun fact about space."
    )

    # 3. Print Result
    print("\n--- GEMINI RESPONSE ---")
    print(response.text)
    print("-----------------------")
    print("\nSUCCESS: New Google Gen AI SDK is working!")

except Exception as e:
    print(f"\nERROR: {e}")
