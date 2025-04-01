# TOEIC Learning App - Backend (Node.js)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)

## 📌 Introduction

Backend system for TOEIC learning and test preparation application, providing APIs for:
- User management
- TOEIC test taking with new format
- Vocabulary learning by topics
- Learning progress tracking
- Performance analysis

## 🚀 Key Features

- **Authentication**: Register/Login with JWT
- **Test Engine**: 
  - Generate random TOEIC format tests
  - Automatic scoring (Listening & Reading)
  - Test history saving
- **Vocabulary**: 
  - 50+ TOEIC vocabulary topics
  - Flashcard learning
  - Vocabulary quizzes
- **Progress Tracking**:
  - Score tracking over time
  - Strength/weakness analysis
  - Improvement roadmap suggestions

## 🔧 Technologies Used

### Core
- **Node.js** 18.x
- **Express.js** 4.x
- **mysql**

### Authentication
- **JWT** (JSON Web Token)
- **Bcrypt** (Password hashing)

### API
- **RESTful API** design
- **Swagger** documentation
- **Rate limiting** (express-rate-limit)