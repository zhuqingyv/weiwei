import './style.css';

const ClassTab = ({ isCurrentClass, item, ratio, onChangeClass }) => {
  const { n } = item;
  const _onChangeClass = () => {
    if (onChangeClass) onChangeClass(item);
  };
  return (
    <div
      className="tree-class-tab-container"
      style={{
        paddingTop: `${10 * ratio}px`,
        paddingBottom: `${10 * ratio}px`,
        color: isCurrentClass ? '#892d3c' : '#8a8b8f',
        cursor: 'pointer'
      }}
      onClick={_onChangeClass}
    >
      <span>{ n }</span>
    </div>
  )
};

export default ClassTab;