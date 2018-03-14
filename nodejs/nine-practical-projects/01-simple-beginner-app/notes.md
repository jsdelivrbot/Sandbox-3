# Notes

## Initial Commit
1. Added start.js file which is the starting point of the application
2. Added app.js which requires express and tells express to use our routes file (./routes/index.js) when any request is made starting with '/'
3. Added routes/index.js to handle our routes, this creates a seperation of concerns so that all our routes can be handled here

*Note:* We also added Nodemon to the project so we can keep our app running whilst we make changes.

## Added Template Engine
* Installed Pug (npm i -S pug)

> A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client.

* Added ./views/form.pug
* Made app.js use Pug as it's templating engine

By default, Express will look for a views directory at the root of the application. However, we have set our views directory explicitly, 

```javascript
app.set('views', path.join(__dirname, 'views')); 

// __dirname refers to the directory from where the current script is running from, so app.js is in the root directory, so __dirname is 01-simple-beginner-app
```
If we had our views in ./src/views then we would need to use 

```javascript
path.join(__dirname, './src/views');
```
* Changed the response in the ./routes/index.js file to render our form.pug view

## Define a Layout file for Pug
* Added ./views/layout.pug to be a master layout for all our templates
* Altered ./views/form.pug to use the layout
* Passed an object along in the res.render method in the route so that the title can be displayed correctly

## Dealing with Forms in Express
* Added router.post method to handle when the form is posted - currently only redirects back to the registration form
* Added package body-parser, this will make our form data available on the request body when we submit the form.
  * By adding ```app.use(bodyParser.urlencoded...);``` we can format the data sent to the server as ```application/x-www-form-urlencoded```
* Added express-validator package to check that the user has entered both fields. This package is a middleware that provides a number of useful methods for sanitisation and validation of user input.

## Interact with a Database
* Added dotenv package ```npm i -S dotenv```
> We'll need somewhere to specify our database connection details. For this, we’ll use a configuration file (which should notbe checked into version control) and the dotenv package.

> Dotenv will load our connection details from the configuration file into Node's ```process.env```.

> We would need to add a .env file to the application root folder which would contain configuration settings. For example,
```DATABASE=mongodb://[URL]:[PORT]/[DB-NAME]``` or
```DATABASE=mongodb://<dbuser>:<dbpassword>@[URL]:[PORT]/[DB-NAME]```

* Added Mongoose package to establish a connection with and perform operations on our database ```npm i -S mongoose```

## Define a Mongoose Schema and Save Data
* Add a Registration schema in ./models/Registration.js
* Updated the POST route to save the data to the DB