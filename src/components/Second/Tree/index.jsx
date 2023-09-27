import { useState, useRef } from 'react';
import { original } from '../useSize';
import LevelTab from './LevelTab';
import backIcon from '../../../assets/back.png'
import openIcon from '../../../assets/open.png'
import backHome from '../../../assets/backHom.png';
import './style.css';

const Tree = ({ ratio, info, level, className, onChangeLevel, onChangeClass, onBackToFirst = () => null }) => {
  const [state, setState] = useState({
    show: false
  });
  const levelCache = useRef(null);
  const top = 32 * ratio;
  const bottom = 12 * ratio;
  const height = window.innerHeight;
  const { show } = state;

  const onChangeShow = () => {
    setState({ ...state, show: !show });
  };

  const _onChangeClass = (classItem) => {
    onChangeClass(classItem);
    setTimeout(() => {
      if (levelCache?.current !== null) {
        onChangeLevel(levelCache.current, classItem);
        levelCache.current = null;
      };
      onChangeShow();
    }, 300);
  };

  const _onchangeLevel = (item) => {
    levelCache.current = item;
  };

  return (
    <div
      className='tree-container'
      style={{
        width: `${365 * ratio}px`,
        top: `${top}px`,
        left: `${original.border.x * ratio}px`,
        height: `${show ? (height - top - bottom) : (50)}px`,
        boxShadow: show ? '0 0 12px rgba(0,0,0,0.5)' : ''
      }}
    >
      {/* 头部导航 */}
      <div className='tree-header-container' style={{ paddingLeft: `${24*ratio}px`, paddingRight: `${12*ratio}px` }} onClick={onChangeShow}>
        <img
          className='tree-header-back-icon'
          src={backHome}
          style={{ marginRight: `${26 * ratio}px` }}
          onClick={onBackToFirst}
        />
        { (!!level) && <div>{ level }</div> }
        <span style={{ marginLeft: `${8*ratio}px`, marginRight: `${8*ratio}px` }}>·</span>
        { (!!className) && <div>{ className }</div> }
        {/* <img
          className='tree-header-open-icon'
          src={openIcon}
          style={{ marginLeft: `${57 * ratio}px`, transform: `rotate(${show ? '0deg' : '-90deg'})` }}
          onClick={onChangeShow}
        /> */}
        <img
          className='tree-header-back-icon'
          src={backIcon}
          style={{ marginRight: `${26 * ratio}px`, transform: `rotate(${show ? 270 : 180}deg)` }}
        />
      </div>

      <div style={{ opacity: show ? '1' : 0, transform: 'all 0.3s', pointerEvents: show ? 'auto' : 'none' }}>
        {
          info.map((item, i) => {
            return (
              <LevelTab
                ratio={ratio}
                item={item}
                isCurrentLevel={item.n === level}
                key={`${item.n}-${i}`}
                className={className}
                onChangeLevel={_onchangeLevel}
                onChangeClass={_onChangeClass}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default Tree;