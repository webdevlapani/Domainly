import 'antd/dist/antd.css';
import React, { FC } from 'react';
import Domain from './components/Domain';
import { Provider } from 'react-redux';
import store from './store/store';

const App: FC = () => (
  <Provider store={store}>
    <Domain />
  </Provider>
);

export default App;
