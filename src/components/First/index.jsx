import CheckBox from '../common/CheckBox';
import level1Icon from '../../assets/level1.png';
import level2Icon from '../../assets/level2.png';
import level3Icon from '../../assets/level3.png';
import level4Icon from '../../assets/level4.png';
import level5Icon from '../../assets/level5.png';
import level6Icon from '../../assets/level6.png';
import backgroundImage from '../../assets/background.jpg';
import backgroundTop from '../../assets/backgroundTop.png';
import backgroundBottom from '../../assets/backgroundBottom.png';

import LOGOIcon from '../../assets/LOGO.png';
import LOGO_TITLE_Icon from '../../assets/LOGO-TITLE.png';
const icon = {
  level1Icon,
  level2Icon,
  level3Icon,
  level4Icon,
  level5Icon,
  level6Icon
};
import './style.css';

export const typeList = [
  {
    n: '知识',
  },
  {
    n: '听辨',
  },
  {
    n: '视唱',
  },
  {
    n: '编创',
  },
  {
    n: '文化',
  }
];

const First = ({ className, level, type, onChangeType, onChangeLevel, info = [] }) => {
  const _onChangeType = (value) => {
    if (onChangeType) onChangeType({ n: value })
  };

  const _onChangeLevel = (item) => {
    if (onChangeLevel) onChangeLevel(item);
  };

  return (
    <div className='first-container' style={{ backgroundImage: `url(${backgroundBottom})` }}>
      <img src={backgroundTop} className='first-container-background-top' />
      <img className='logo' src={LOGOIcon} />
      <div className='logo-title'>
        <img src={LOGO_TITLE_Icon} />
      </div>
      {/* 维度选择 */}
      <div className='first-type-container'>
        <span style={{ color: '#A0A0A0' }}>默认维度:</span>
        {
          typeList.map(({ n: name }, i) => {
            return (
              <CheckBox
                checked={type === name}
                text={name}
                onChange={i === 5 ? (() => null) : _onChangeType}
                style={{ marginLeft: '20px' }}
                key={`${name}-${i}`}
              />
            )
          })
        }
      </div>

      {/* 级别选择 */}
      <div className='first-level-container'>
        {
          info.map((item, i) => {
            return (
              <img
                className='first-level-item'
                src={icon[`level${i + 1}Icon`]}
                style={{ marginRight: i === 5 || i === 2 ? '0px' : '72px' }}
                onClick={() => _onChangeLevel(item)}
                key={`${item.n}-${i}`}
              />
            )
          })
        }
        <img className='first-level-item' src={icon[`level${6}Icon`]} style={{ marginRight: '0' }} />
      </div>
    </div>
  );
};

export default First;