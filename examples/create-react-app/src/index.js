import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './less/main.less';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
