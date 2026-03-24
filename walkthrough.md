# Walkthrough - Dockerized College Enquiry Chatbot

I have successfully built the complete full-stack chatbot application for college enquiries. The project is fully containerized and ready to run with a single command.

## Final Deliverables

### 🚀 Docker Orchestration
The entire application is containerized and ready for deployment.
- **Frontend**: Port 3031
- **Backend**: Port 3030
- **AI Service**: Port 5050

### 🧠 Intelligent FAQ Service
- **Expanded Knowledge Base**: 100+ conversational and college-specific entries.
- **Best-Match Logic**: The AI service now tokenizes user input and returns the most relevant answer based on keyword density.
- **Auto-Expanded Keywords**: All keywords automatically include singular, plural, and concatenated variations.

### 🎨 Premium React UI
- **Glassmorphic Design**: A modern, translucent interface with smooth animations.
- **Layout Stability**: Resolved all "bouncing" issues during chat updates.
- **Auto-Focus**: The input field automatically regains focus after every message for a seamless experience.

### 📦 GitHub Ready
- **Repository Synced**: All files have been pushed to the `main` branch.
- **Configured .gitignore**: Optimized for Node.js, Python, and React environments.

## Project Structure

```text
ai-chatbot-pg/
├── ai-service/          # Python Flask Service
│   ├── app.py
│   ├── faq_data.json    # 30-50 FAQs
│   └── Dockerfile
├── backend/             # Node.js Express Gateway
│   ├── server.js
│   └── Dockerfile
├── frontend/            # React UI
│   ├── src/
│   │   ├── App.js       # Glassmorphic Chat UI
│   │   └── index.css    # Premium Styling
│   └── Dockerfile
└── docker-compose.yml   # Orchestration
```

## How to Run

1. **Ensure Docker is running** on your system.
2. **Navigate to the root directory**:
   ```bash
   cd "/Users/uxmint201451/Documents/GitHub Own/ai-chatbot-pg"
   ```
3. **Run the application**:
   ```bash
   docker-compose up --build
   ```
4. **Access the Chatbot**:
   - **Frontend**: [http://localhost:3031](http://localhost:3031)
   - **Backend API**: [http://localhost:3030/chat](http://localhost:3030/chat)
   - **AI Service**: [http://localhost:5050/chat](http://localhost:5050/chat)

## Verification Results

| Service | Status | Port | Functionality |
| :--- | :--- | :--- | :--- |
| **Frontend** | ✅ Ready | 3031 | Premium UI with animations |
| **Backend** | ✅ Ready | 3030 | Request forwarding & CORS |
| **AI Service** | ✅ Ready | 5050 | Keyword matching logic |

### Sample Queries to Try
- "What are the fees for B.Tech?"
- "How do I apply for admission?"
- "What courses do you offer?"
- "Is there a hostel facility?"
- "What is the placement record?"
