## Notes

### Initial Commit
1. Added start.js file which is the starting point of the application
2. Added app.js which requires express and tells express to use our routes file (routes/index.js) when any request is made starting with '/'
3. Added routes/index.js to handle our routes, this creates a seperation of concerns so that all our routes can be handled here

*Note:* We also added Nodemon to the project so we can keep our app running whilst we make changes.