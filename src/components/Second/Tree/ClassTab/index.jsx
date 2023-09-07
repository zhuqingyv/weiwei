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
        color: isCurrentClass ? '#f38080' : '#8a8b8f',
        backgroundColor: isCurrentClass ? '#fef5f6' : 'white',
        cursor: 'pointer'
      }}
      onClick={_onChangeClass}
    >
      <span>{ n }</span>
    </div>
  )
};

export default ClassTab;