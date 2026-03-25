# Walkthrough - Dockerized College Enquiry Chatbot

I have successfully built the complete full-stack chatbot application for college enquiries. The project is fully containerized and ready to run with a single command.

## Features Delivered

- **Premium Chat Interface**: A modern, glassmorphic UI built with React, featuring smooth animations (Framer Motion) and a responsive design.
- **Node.js Gateway**: An Express backend that acts as a secure intermediary between the frontend and the AI service.
- **Python AI Service**: A Flask-based service that performs keyword matching against a 30+ FAQ JSON database.
- **Dockerized Environment**: Fully containerized setup with `docker-compose` for easy deployment and local development.

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
   - **AI Service**: [http://localhost:5056/chat](http://localhost:5056/chat)

## Verification Results

| Service | Status | Port | Functionality |
| :--- | :--- | :--- | :--- |
| **Frontend** | ✅ Ready | 3031 | Premium UI with animations |
| **Backend** | ✅ Ready | 3030 | Request forwarding & CORS |
| **AI Service** | ✅ Ready | 5056 | Keyword matching logic |

### Sample Queries to Try
- "What are the fees for B.Tech?"
- "How do I apply for admission?"
- "What courses do you offer?"
- "Is there a hostel facility?"
- "What is the placement record?"
