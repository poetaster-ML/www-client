export default class MouseLocator {
  screenX = 0;
  screenY = 0;

  clientX = 0;
  clientY = 0;

  constructor () {
    document.addEventListener('mousemove', (e) => {
      const {
        screenX, screenY,
        clientX, clientY
      } = e;

      this.screenX = screenX;
      this.screenY = screenY;

      this.clientX = clientX;
      this.clientY = clientY;
    });
  }

  get x () {
    return this.clientX;
  }
  get y () {
    return this.clientY;
  }
};
