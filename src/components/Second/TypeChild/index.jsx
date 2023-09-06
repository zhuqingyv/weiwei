
import './style.css';
const TypeChild = ({ item, onChangeItemIndex }) => {
  if (!item?.c?.length) return null;

  const list = item.c || [];
  const index = item.index || 0;
  const _onChangeItemIndex = (i) => {
    item.index = i;
    if (onChangeItemIndex) onChangeItemIndex(i)
  };

  return (
    <div className='type-child-container'>
      {
        list.map(({ n, p }, i) => {
          const isCurrent = index === i;
          return (
            <div key={p} className={`type-child-text ${isCurrent ? 'type-child-selected' : 'type-child-normal'}`} onClick={() => _onChangeItemIndex(i)}>{ n }</div>
          )
        })
      }
    </div>
  );
};

export default TypeChild;