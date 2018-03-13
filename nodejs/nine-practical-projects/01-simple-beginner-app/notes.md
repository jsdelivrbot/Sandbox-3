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
