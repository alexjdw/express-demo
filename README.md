# express-demo
Express Demo using MongoDB, Mongoose and file upload.

# Usage

* Clone the repo, then NPM install the required packages from the package-lock or just via npm install.
* Start MongoDB. If needed, update this line in server.js:
```
mongoose.connect('mongodb://localhost/animal_db');
```
* Run the server with node or nodemon
* Open up localhost:5000 
* You'll see that there's no selection in the top dropdown. Click "Don't See Your Animal?" Then use the form to add a species. Your species will appear on the index route now. You can add as many species as you like.
* Back on localhost:5000, add an animal by selecing a species, giving it a name, and filling out the form. You can upload an image with the file picker.

# Notes / TODO

```
Includes limited validations in the schema, but pre-submit validations and dynamic validations like the species minweight/maxweight were excluded to save myself a bit of time and get moving on to the good stuff.
CSS/JavaScript is inline in the HTML files. Needs to be exported to the static folder.
Express-session is not used, but it could be added to display proper errors to the user where needed.
```
