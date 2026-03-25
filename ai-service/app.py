from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

# Load FAQ data
FAQ_FILE = 'faq_data.json'

def load_faqs():
    if os.path.exists(FAQ_FILE):
        with open(FAQ_FILE, 'r') as f:
            return json.load(f)
    return []

faqs = load_faqs()

@app.route('/chat', methods=['POST'])
def chat():
    # Reload FAQs on every request to pick up changes without restart
    faqs = load_faqs()
    
    data = request.json
    user_message = data.get('message', '').lower()

    if not user_message:
        return jsonify({"response": "Please say something!"})

    # Tokenize user message into words
    import re
    user_words = set(re.findall(r'\w+', user_message))

    best_match = None
    max_score = 0

    for item in faqs:
        score = 0
        for keyword in item['keywords']:
            # Check if keyword (as a whole word or phrase) is in the user's message
            if keyword.lower() in user_message:
                score += 1
        
        if score > max_score:
            max_score = score
            best_match = item['response']

    if best_match:
        return jsonify({"response": best_match})

    return jsonify({"response": "Sorry, I don't understand. Can you rephrase or ask about fees, courses, or admission?"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5056)
