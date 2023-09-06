import './style.css';

import zhishi from '../../../assets/zhishi.png';
import tingbian from '../../../assets/tingbian.png';
import shichang from '../../../assets/shichang.png';
import bianchuang from '../../../assets/bianchuang.png';
import wenhua from '../../../assets/wenhua.png';

import zhishi2 from '../../../assets/zhishi2.png';
import tingbian2 from '../../../assets/tingbian2.png';
import shichang2 from '../../../assets/shichang2.png';
import bianchuang2 from '../../../assets/bianchuang2.png';
import wenhua2 from '../../../assets/wenhua2.png';


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