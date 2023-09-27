import { useState, useEffect } from 'react';
import ClassTab from '../ClassTab';
import backIcon from '../../../../assets/back.png'
import openIcon from '../../../../assets/open.png';
import './style.css';

const LevelTab = ({ levelCache, ratio, item, isCurrentLevel, className, onChangeClass, onChangeLevel }) => {
  const [show, setShow] = useState(false);
  const { n, c = [] } = item;

  const _onChangeLevel = () => {
    if (onChangeLevel) onChangeLevel(item);
    setShow(!show)
  };

  useEffect(() => {
    setShow(isCurrentLevel)
  }, [isCurrentLevel]);

  return (
    <>
      <div
        className='tree-level-tab-container'
        style={{
          paddingLeft: `${95 * ratio}px`,
          paddingRight: `${83 * ratio}px`,
          backgroundColor: isCurrentLevel ? '#FEF5F6' : 'white',
          color: isCurrentLevel ? '#783637' : '#a5a5a5',
          paddingTop: `${15 * ratio}px`,
          paddingBottom: `${15 * ratio}px`,
          transition: 'all 0.3s'
        }}
        onClick={_onChangeLevel}
      >
        <span>{n}</span>
        <img
          className='tree-header-back-icon'
          // src={openIcon}
          // style={{ transform: `rotate(${show ? '0deg' : '-90deg'}) scale(1.3)` }}
          src={backIcon}
          style={{ transform: `rotate(${show ? '270deg' : '180deg'})` }}
          onClick={() => setShow(!show)}
        />
      </div>

      {
        (!!c?.length && levelCache !== null && levelCache?.n === n) && <div style={{ marginTop: `${8 * ratio}px` }}>
          {
            c.map((classItem, i) => {
              return (
                <ClassTab
                  isCurrentClass={isCurrentLevel && className === classItem.n}
                  item={classItem}
                  ratio={ratio}
                  key={`${classItem.n}-${i}`}
                  onChangeClass={onChangeClass}
                />
              )
            })
          }
        </div>
      }
    </>
  )
};

export default LevelTab;