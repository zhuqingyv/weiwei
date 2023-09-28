import { useState } from 'react';
import useSize from './useSize';
import Tree from './Tree';
import TopTab from './TopTab';
import TypeChild from './TypeChild';
import logoRight from '../../assets/logo-right.png';
import loadingIcon from '../../assets/loading.png';
import config from '../../config.json';
'../../assets'

import './style.css';

// 知识：ff9999
// 听辨：f7c677
// 视唱：c7d58d
// 编创：aad7e3
// 文化：a9c8e9

const colorMap = {
  '知识': '#ff9999',
  '听辨': '#f7c677',
  '视唱': '#c7d58d',
  '编创': '#aad7e3',
  '文化': '#a9c8e9'
};

// x: 38,
// y: 46

const computedIframeSize = (width, height) => {
  const W_ratio = width / 1920;
  const currentHeight = W_ratio * 1080;

  // 如果高度不够
  if (currentHeight >= height) {
    const H_ratio = height / currentHeight;
    const ratio = W_ratio * H_ratio;
    return [ratio];
  };

  return [W_ratio];
};

// 当前维度
const getCurrentItem = ({ level, className, type, typeChild }) => {
  const list = config;
  const levelItem = list.find(({ n }) => n === level);
  if (levelItem) {
    const { c } = levelItem;
    const classItem = c.find(({ n }) => n === className);
    if (classItem && classItem?.c?.length) {
      const { c } = classItem;
      if (c?.length) {
        const typeItem = c.find(({ n }) => n === type);
        return typeItem;
      };
    };
  };
  return null;
};

const getCurrentClass = ({ level, className }) => {
  const list = config;
  const levelItem = list.find(({ n }) => n === level);
  if (levelItem) {
    const { c } = levelItem;
    const classItem = c.find(({ n }) => n === className);
    return classItem
  };
  return null;
};

const getIframePath = ({ item, hasTypeChild }) => {
  try {
    const { index = 0 } = item;
    if (hasTypeChild) {
      const current = item.c[index];
      return current.p;
    };
    return item.p
  } catch {
    return '';
  }
};

const Second = ({ info, level, className, type, typeChild, onChangeLevel, onChangeClass, onChangeType, onBackToFirst }) => {
  const [_, forceUpdate] = useState(Date.now());
  const [showLoading, setShowLoading] = useState(false);
  const [width, height, ratio] = useSize({ width: 1920, height: 1080 });
  const [iframeRatio] = computedIframeSize(width, height);
  const backgroundColor = colorMap[type];

  const item = getCurrentItem({ level, className, type, typeChild });
  const currentClass = getCurrentClass({ level, className });
  const hasTypeChild = !!item?.c?.length;
  const _iframeUrl = getIframePath({ item, hasTypeChild });
  const iframeUrl = _iframeUrl ? `../../../${_iframeUrl}` : `../../../pages/${level}/${className}/${type}`;
  const isHTML = iframeUrl.includes('.html');
  const onChangeItemIndex = () => {
    forceUpdate(Date.now());
  };
  const onLoadStart = () => {
    setShowLoading(true);
  };
  const onLoad = () => {
    setShowLoading(false);
  };

  return (
    <div className='second-container' style={{ backgroundColor }}>
      {/* 类型切换 */}
      <TopTab currentClass={currentClass} ratio={ratio} onChangeType={onChangeType} type={type} />

      {/* Tree */}
      <Tree
        ratio={ratio}
        info={info}
        level={level}
        className={className}
        onChangeLevel={onChangeLevel}
        onChangeClass={onChangeClass}
        onBackToFirst={onBackToFirst}
      />

      {/* 渲染主场景 */}
      <div
        className='second-content-container'
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      >
        <TypeChild item={item} onChangeItemIndex={onChangeItemIndex} />
        <img className='logo-right-top' src={logoRight} />
        {
          (isHTML) && <iframe
            className='second-content-iframe'
            src={iframeUrl ? `../../../${iframeUrl}` : `../../../pages/${level}/${className}/${type}`}
            style={{
              width: '1920px',
              height: '1080px',
              transform: `scale(${iframeRatio})`,
              display: isHTML ? 'block' : 'none'
            }}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
          />
        }
        {
          (isHTML && showLoading) && <div className='loading-container'>
            <img src={loadingIcon} className='loading' />
          </div>
        }
        <div className='empty-pages' style={{ transform: `scale(${isHTML ? '0' : '1'})` }}>网页丢啦 ~</div>
      </div>
    </div>
  );
};

export default Second;