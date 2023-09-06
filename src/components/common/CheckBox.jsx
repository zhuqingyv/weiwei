const getColor = (boolean) => {
  return {
    backgroundColor: boolean ? '#a83125' : '#fff',
    borderColor:  boolean ? '#a83125' : '#000',
    color: boolean ? '#a83125' : '#000'
  }
};

const CheckBox = ({ checked = false, text = '文本', onChange, style = {} }) => {
  const onClick = () => {
    if (onChange) onChange(text, !checked);
  };

  const { backgroundColor, borderColor, color } = getColor(checked);

  return (
    <div className="checkbox-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', userSelect: 'none', ...style }} onClick={onClick}>
      {/* 选中框 */}
      <div style={{
        width: '10px',
        height: '10px',
        borderRadius: '18px',
        backgroundColor,
        borderColor,
        borderStyle: 'solid',
        borderWidth: '1px',
        transition: 'all 0.3s'
      }}></div>

      {/* 文本 */}
      <div style={{ fontSize: '16px', color, marginLeft: '7px' }}>{ text }</div>
    </div>
  )
};

export default CheckBox;