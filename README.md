<img width="1080" height="2400" alt="Screenshot_1771091873" src="https://github.com/user-attachments/assets/4f7fad61-862d-4e15-9ef0-e260c5f10672" />
<img width="1080" height="2400" alt="Screenshot_1771091868" src="https://github.com/user-attachments/assets/5673de55-da7f-4fd0-ba9c-dc7e72cc8211" />
<img width="1080" height="2400" alt="Screenshot_1771091852" src="https://github.com/user-attachments/assets/5f621e9f-3682-4ff1-b826-5ebdbe9e2907" />
<img width="1080" height="2400" alt="Screenshot_1771091710" src="https://github.com/user-attachments/assets/fdd27c8f-f175-4704-b233-b1f8abcbee00" />

Textriz – Real-Time Private Chat App

Textriz is a full-stack real-time chat application built with React Native and Node.js.
It supports secure authentication, private messaging, and persistent chat history.

Tech Stack

Frontend

React Native (CLI)

TypeScript

Redux Toolkit + Redux-Saga

Axios (with JWT interceptor)

Socket.IO Client

React Navigation

react-native-gifted-chat

Backend

Node.js

Express

MongoDB + Mongoose

JWT (Access & Refresh tokens)

Socket.IO

Features

User registration & login (JWT-based authentication)

Access + refresh token flow

Secure token storage & auto session rehydration

Search users by email

One-to-one private chat

Real-time messaging using Socket.IO

Chat history persistence in MongoDB

Typing indicator

Room-based socket architecture

Clean navigation: Home → Chat → Back → Logout

Application Flow

User registers or logs in

User lands on Home screen

User searches another user by email

User opens chat

Chat history loads

Messages are exchanged in real-time

User can navigate back or logout

Key Implementation Highlights

Token refresh handling via Axios interceptor

Redux-Saga for async side effects

Event-driven socket room join/leave

Proper separation of API, state, and socket layers

Persistent chat storage with MongoDB

Running the Project
Backend
npm install
npm run dev

Frontend
npm install
npx react-native run-android


This project demonstrates:

Strong understanding of authentication flow

Real-time communication architecture

Clean Redux-Saga state management

Full-stack integration between mobile app and backend
