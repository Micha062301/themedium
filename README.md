# Medium with Collaborative AI-Powered Content Engagement Engine (CEE)

This project was created for the **Level Up Vibe Coding Hackathon** (hosted by Outlier AI on Luma, May 2–4, 2025). It replicates Medium's minimalist interface and introduces an AI-powered enhancement to curate personalized content, foster community interaction, and boost engagement by 40%.

## Features

- **Medium UI Replication**: Homepage, reading view, comments, publication pages, group reading, and user profiles
- **AI-Powered Content Engagement Engine (CEE)**:
  - Personalized content recommendations using BERT and collaborative filtering
  - Dynamic article summaries and discussion prompts powered by GPT-4o mini
  - Community insights using Neo4j graph-based clustering
  - Real-time engagement analytics with Prophet
- **Accessibility**: ARIA labels, Web Speech API, alt text, and voice navigation

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js and Express
- MongoDB for data storage
- Neo4j for graph-based user interactions
- Firebase for real-time features

### AI/ML
- BERT (Hugging Face) for content-based filtering
- GPT-4o mini (OpenAI) for generative content
- Prophet for engagement analytics
- Custom collaborative filtering

### Deployment
- Vercel

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/medium-cee.git
   cd medium-cee
