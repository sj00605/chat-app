### Chat APP

This is a simple chat app built with React and Socket.IO.
This app is currently for prototping purposes to sign messages using hardware encryption.

### Starting the app

1. Clone the repository
2. Install dependencies
    - npm install
3. Start the server
    - cd /server
    - npm run build    # Compiles TypeScript to JavaScript
    - npm start        # Runs the compiled JavaScript
    # Alternatively, for development:
    - npm run dev      # Runs TypeScript directly with ts-node
4. Start the client
    - npm start        # Runs the React app (main package)

### Features

- Join a chat room

### Next steps

- Add watcher to server and app to speed up development
- Add log in and out
- Add a way to store messages
- Add a way to delete messages

- Add a way to sign messages
- Add a way to verify messages