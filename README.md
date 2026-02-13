#  Kanban Board Application

A modern, responsive Kanban board application built with React.js featuring optimistic UI updates, drag-and-drop functionality, and robust error handling with automatic rollback.

## 🚀 Features

- *Mock Authentication*: Simple login system with localStorage persistence
- *Drag & Drop*: Smooth task movement between columns using @dnd-kit
- *Optimistic UI*: Instant UI updates with automatic rollback on API failure
- *Mock API*: Simulated backend with 1-2s latency and 20% random failure rate
- *State Management*: React Context API for global state management
- *Toast Notifications*: Real-time feedback for user actions
- *Responsive Design*: Mobile-friendly layout using Tailwind CSS
- *Persistent Storage*: Tasks and user session stored in localStorage

## 📋 Technical Requirements

- *Framework*: React.js (v19)
- *Styling*: Tailwind CSS
- *State Management*: React Context API
- *Drag & Drop*: @dnd-kit/core and @dnd-kit/sortable
- *Icons*: lucide-react
- *Notifications*: sonner (toast library)

## 🏗️ Project Structure


src/
├── components/
│   ├── AddTaskForm.js      # Form component for adding new tasks
│   ├── Column.js            # Kanban column component
│   ├── TaskCard.js          # Individual task card with drag handle
│   └── ui/                  # Shadcn UI components
├── context/
│   ├── AuthContext.js       # Authentication state management
│   └── KanbanContext.js     # Kanban board state with optimistic updates
├── pages/
│   ├── LandingPage.js       # Login page
│   └── KanbanBoard.js       # Main Kanban board view
├── utils/
│   └── mockApi.js           # Mock API with delay and failure simulation
├── App.js                   # Main app component with routing
└── index.js                 # App entry point



## 🎯 How to Use

1. *Login*: Enter any non-empty username/email on the landing page
2. *Add Task*: Click "Add New Task" button and enter task title
3. *Move Task*: Drag and drop tasks between columns (To Do, In Progress, Done)
4. *Delete Task*: Hover over a task card and click the delete icon
5. *Logout*: Click the logout button in the header

## 🧠 Optimistic UI Approach

### Implementation Strategy

The application implements optimistic UI updates to provide instant user feedback while maintaining data consistency:

1. *Immediate Update*: When a user performs an action (add, move, delete), the UI updates instantly
2. *State Snapshot*: Before the API call, we capture the current state
3. *Async API Call*: Make the mock API request in the background
4. *Success Handling*: If successful, the optimistic update becomes permanent
5. *Failure Handling*: If failed, automatically rollback to the previous state and show an error toast


### Rollback Logic

The rollback mechanism ensures data consistency:

- *State Preservation*: Before each operation, we create a deep copy of the current state
- *Automatic Reversion*: On API failure, we restore the previous state instantly
- *User Notification*: Display clear error messages via toast notifications
- *No Data Loss*: LocalStorage is updated only after successful operations or during rollback

### Why This Approach?

- *Better UX*: Users don't wait for server responses
- *Feels Responsive*: App feels fast and snappy
- *Clear Feedback*: Users know immediately if something went wrong
- *Data Integrity*: Automatic rollback prevents inconsistent states

## 🎲 Mock API Behavior

The mock API simulates realistic backend behavior:

- *Latency*: Random delay between 1-2 seconds per operation
- *Failure Rate*: 20% cacing
- Built with React.js, Tailwind CSS, and modern web technologies.
