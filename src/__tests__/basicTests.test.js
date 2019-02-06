import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

//honestly, all components should at least have smoke tests. 
// If something BIG goes wrong, it's great when you can eliminate the issue coming from something basic, 
// ...or so you an narrow down where the issue is not occuring.