# Dynamic Theme

In this project, we are using two theme provided by Ant Design i.e. Dark theme and Compact (light) theme.

## config-overrides.js

`config-overrides.js` file contains plugin configurations and you can get the idea, how you can create your own theme file and then you can apply
this on demand.


## src/dark.json, src/light.json

These json files will be created when you will run your project and dark.json will contain dark theme variables and light.json will contain 
compact theme variables provides by Ant Design. You can create your own theme or you can install and use any other theme for ant design.
These json files will be used in component to update your theme using `less.modifyVars(yourVars)`. See App.js code


