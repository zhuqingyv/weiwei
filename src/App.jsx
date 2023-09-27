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

const getCurrentTarget = (state) => {
  const {
    level,
    className,
    type
  } = state;

  const levelItem = config.find(({ n }) => n === level);
  const classItem = levelItem.c.find(({ n }) => n === className);
  const [typeItem] = classItem.c || [];
  const typeChildItem = typeItem.c?.length ? typeItem.c[0] : undefined;

  return {
    ...state,
    level: levelItem.n,
    className: classItem.n,
    type: typeItem.n,
    typeChild: typeChildItem?.n || ''
  }
};

const App = () => {
  const [params] = useParams();

  const [state, setState] = useState(() => {
    return getCurrentTarget({
      info: config,
      currentPage: params.page || 'first',
      level: '一级',
      className: '第一课',
      type: '知识',
      typeChild: cell === 3 ? '' : initTypeChild
    });
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

  const onChangeLevel = (item = {}, classItem) => {
    const { n } = item;
    if (classItem) {
      const newState = { ...state, level: n, currentPage: 'second', className: classItem?.n };
      setState(newState);
      return;
    };
    const newState = { ...state, level: n, currentPage: 'second' };
    // if (currentPage === 'first') {
    //   setState(newState);
    // } else {
    //   const _newState = getCurrentTarget(newState);
    //   setState(_newState);
    // };
    setState(newState);
  };

  const onChangeClass = (item = {}, isFirstPage = false) => {
    if (isFirstPage) {
      const { n } = item;
      const newState = { ...state, className: n };
      // const _newState = getCurrentTarget(newState);
      setState(newState);
      return;
    };
    const { n } = item;
    const newState = { ...state, className: n };
    // const _newState = getCurrentTarget(newState);
    setState(newState);
  };

  const onBackToFirst = () => {
    const newState = { ...state, currentPage: 'first' };
    // const _newState = getCurrentTarget(newState);
    setState({ ...newState });
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
