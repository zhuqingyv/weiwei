import './style.css';

import zhishi from '/public/zhishi.png';
import tingbian from '/public/tingbian.png';
import shichang from '/public/shichang.png';
import bianchuang from '/public/bianchuang.png';
import wenhua from '/public/wenhua.png';

import zhishi2 from '/public/zhishi2.png';
import tingbian2 from '/public/tingbian2.png';
import shichang2 from '/public/shichang2.png';
import bianchuang2 from '/public/bianchuang2.png';
import wenhua2 from '/public/wenhua2.png';


export const typeList = [
  {
    n: '知识',
    icon: zhishi,
    checked: zhishi2
  },
  {
    n: '听辨',
    icon: tingbian,
    checked: tingbian2
  },
  {
    n: '视唱',
    icon: shichang,
    checked: shichang2
  },
  {
    n: '编创',
    icon: bianchuang,
    checked: bianchuang2
  },
  {
    n: '文化',
    icon: wenhua,
    checked: wenhua2
  }
];

const getList = (currentClass  ={}) => {
  const { c } = currentClass;
  if (!c?.length) return [];

  return typeList.filter(({ n }) => {
    return c.find(({ n: cn }) => cn === n)
  });
};

const TopTab = ({ currentClass, ratio, onChangeType, type }) => {
  const list = getList(currentClass);
  return (
    <div className='second-type-container'>
      {
        list.map((item, i) => {
          const { n, icon, checked } = item;
          const _onChangeType = () => {
            if (onChangeType) onChangeType(item);
          };

          const isCurrent = type === n;

          return (
            <img
              className='second-type-item'
              src={isCurrent ? checked : icon}
              style={{
                width: `${140 * ratio}px`,
                height: `${80 * ratio}px`
              }}
              key={`${n}-${i}`}
              onClick={_onChangeType}
            />
          )
        })
      }
    </div>
  )
};

export default TopTab;