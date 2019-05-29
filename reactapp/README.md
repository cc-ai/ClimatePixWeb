
**Climage Collection REACT UI**

The point of entry for the react app is the ../reactapp/index.js . index.js loads
the appropriate react component according to the routes defined in the ../reactapp/indexRoutes.js. For every route we load a component from ../reactapp/layouts folder. A layout in our app is equivalent to a HTML page layout. A layout can call a bunch of smaller components from the ../reactapp/components/ folder to make it a modular page. 

To Run the React APP

1. Make sure node and npm are installed on your machine.
2. Navigate inside to the ../reactapp/ folder where package.json is and do _npm install --save_ this will install required node packages to run the app.
3. To run the app, type  _npm start_ . This will launch the application 
4. To run the doc's server run _npx styleguidist server_ from the project directory or _npx styleguidist build_ to build the html version. We are using react-styleguidedist library. 