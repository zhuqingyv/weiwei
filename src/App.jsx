import { useState } from 'react';
import config from './config.json';
import './App.css'

import First from './components/First';
import Second from './components/Second';
let initTypeChild = '';
let cell = 0;

const loop = (list = []) => {
  cell += 1;
  list.find(({ n, isPage, c = [] }) => {
    if (isPage) {
      initTypeChild = n
      return true;
    };
    if (c?.length) loop(c);
  });
};

loop(config);

const useParams = () => {
  const url = location.href;
  const [baseUrl, paramsString = ''] = url.split('?');
  const params = paramsString.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=');
    pre[key] = value;
    return pre;
  }, []);

  return [params, baseUrl]
};

const App = () => {
  const [params] = useParams();

  const [state, setState] = useState({
    info: config,
    currentPage: params.page || 'first',
    level: '一级',
    className: '第一课',
    type: '知识',
    typeChild: cell === 3 ? '' : initTypeChild
  });

  const {
    info,
    currentPage,

    level,
    className,
    type,
    typeChild
  } = state;

  const onChangeType = (item = {}) => {
    const { n } = item;
    setState({ ...state, type: n });
  };

  const onChangeLevel = (item = {}) => {
    const { n } = item;
    setState({ ...state, level: n, currentPage: 'second' });
  };

  const onChangeClass = (item = {}) => {
    const { n } = item;
    setState({ ...state, className: n });
  };

  const onBackToFirst = () => {
    setState({ ...state, currentPage: 'first' })
  };

  return (
    <div className='container'>
      {
        (currentPage === 'first') && (
          <First
            info={info}
            level={level}
            className={className}
            type={type}
            onChangeType={onChangeType}
            onChangeLevel={onChangeLevel}
          />
        )
      }
      {
        (currentPage === 'second') && (
          <Second
            info={info}
            level={level}
            className={className}
            type={type}
            typeChild={typeChild}
            onChangeType={onChangeType}
            onChangeLevel={onChangeLevel}
            onChangeClass={onChangeClass}
            onBackToFirst={onBackToFirst}
          />
        )
      }
    </div>
  )
};

export default App;
