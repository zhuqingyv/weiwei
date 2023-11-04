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

const getCurrentTarget = (state, _findType) => {
  const {
    level,
    className,
    type
  } = state;

  const levelItem = config.find(({ n }) => n === level);
  const classItem = levelItem.c.find(({ n }) => n === className);
  const [typeItem] = classItem.c || [];
  const typeChildItem = typeItem.c?.length ? typeItem.c[0] : undefined;
  const findType = (classItem.c || []).find(({ n }) => n === _findType);

  return {
    ...state,
    level: levelItem.n,
    className: classItem.n,
    type: typeItem.n,
    typeChild: typeChildItem?.n || '',
    findType
  }
};

const App = () => {
  const [state, setState] = useState(() => {
    const currentPageString = localStorage.getItem('currentPageString');
    return getCurrentTarget({
      info: config,
      currentPage: currentPageString || 'first',
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
    Object.assign(state, { ...state, type: n });
    setState({ ...state, type: n });
  };

  const onChangeLevel = (item = {}, classItem) => {
    const { n } = item;
    if (classItem) {
      const newState = { ...state, level: n, currentPage: 'second', className: classItem?.n };
      const _newState = getCurrentTarget(newState, newState.type);
      if (_newState.findType) {
        setState(newState);
        Object.assign(state, newState);
        return;
      };
      setState({ ...newState, type:  _newState.type });
      Object.assign(state, { ...newState, type:  _newState.type });
      return;
    };
    const _newState = getCurrentTarget(newState);
    if (_newState.findType) {
      setState(newState);
      Object.assign(state, newState)
      return;
    };
    const newState = { ...state, level: n, currentPage: 'second' };
    Object.assign(state, { ...newState, type: _newState.type })
    setState({ ...newState, type: _newState.type });
  };

  const onChangeClass = (item = {}, isFirstPage = false) => {
    if (isFirstPage) {
      const { n } = item;
      const newState = { ...state, className: n };
      const _newState = getCurrentTarget(newState, newState.type);
      if (_newState.findType) {
        Object.assign(state, newState)
        setState(newState);
        return;
      };
      Object.assign(state, { ...newState, type: _newState.type })
      setState({ ...newState, type: _newState.type });
      return;
    };

    const { n } = item;
    const newState = { ...state, className: n };
    const _newState = getCurrentTarget(newState, newState.type);
    if (_newState.findType) {
      Object.assign(state, newState)
      setState(newState);
      return;
    };
    Object.assign(state, { ...newState, type: _newState.type })
    setState({ ...newState, type: _newState.type });
  };

  const onBackToFirst = () => {
    const newState = { ...state, currentPage: 'first' };
    Object.assign(state, { ...newState })
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
