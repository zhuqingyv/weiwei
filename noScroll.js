const noScroll = () => {
  const repeat = document.querySelector('#no-scroll-style');
  if (repeat) return;
  const style = document.createElement('style');
  style.setAttribute('id', 'no-scroll-style');
  style.innerHTML = `*::-webkit-scrollbar {
    width: 0px;
  }`;
  document.body.appendChild(style);
};
noScroll();