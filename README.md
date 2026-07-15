# Online Complaint Registration System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to provide a digital platform for registering, managing, and resolving complaints efficiently. The system includes separate dashboards for Admin, Agent, and User roles with secure authentication and role-based access.

##  Project Overview

Online Complaint Registration System is a web-based application that allows users to submit complaints online and track their progress. Agents can manage and resolve assigned complaints, while administrators can monitor the entire complaint workflow, manage users, and control system activities.

This system reduces manual complaint handling and improves transparency, communication, and efficiency between users and service providers.


##  Features

###  User Module

- User registration and login
- Secure authentication
- Submit complaints online
- View complaint status
- Track complaint progress
- Manage user profile
- Responsive dashboard


###  Agent Module

- Agent login
- Agent dashboard
- View assigned complaints
- Update complaint status
- Manage complaint resolution process
- Track completed and pending complaints


###  Admin Module

- Admin authentication
- Admin dashboard
- Manage users
- Manage agents
- Assign complaints to agents
- Monitor complaint activities
- View complaint statistics


##  Tech Stack

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Axios
- React Router


### Backend

- Node.js
- Express.js


### Database

- MongoDB


### Tools & Deployment

- Git
- GitHub
- VS Code
- Postman
- Vercel (Frontend Deployment)
- Render (Backend Deployment)


##  Project Structure

```bash
Online-Complaint-Registration-System/

├── client/
│
│── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│
│── models/
│── routes/
│── controllers/
│── server.js
│
├── package.json
└── README.md
```

##  Installation and Setup

### Clone Repository

```bash
git clone https://github.com/mdarshnaqi786-code/ONLINE-COMPLAINT-REGISTRATION-/
```


### Frontend Setup

```bash
cd client

npm install

npm run dev
```


### Backend Setup

```bash
cd server

npm install

npm start
```


##  Environment Variables

Create `.env` file inside server folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```


##  Authentication & Authorization

The system provides role-based authentication for:

- Admin
- Agent
- User

Each role has separate permissions and dashboard access.


##  Deployment

Frontend Deployment:

- Vercel


Backend Deployment:

- Render

Live Demo Link:

https://online-complaint-registration-jet.vercel.app/

##  Responsive Design

The application provides a responsive user interface compatible with:

- Desktop
- Laptop
- Tablet
- Mobile


##  Future Enhancements

- Email notifications for complaint updates
- Complaint priority management
- Real-time chat support
- Advanced analytics dashboard
- Feedback and rating system
- File/image upload for complaints


##  Conclusion

The Online Complaint Registration System provides a simple and efficient way to register, manage, and resolve complaints digitally. Using MERN stack technologies, it improves communication between users, agents, and administrators while providing a secure and scalable solution.


##  Developer

Developed as part of Smart Bridge Internship Project.

```
