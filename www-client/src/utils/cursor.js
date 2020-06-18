export default class CursorUtility {
  screenX = 0;
  screenY = 0;

  clientX = 0;
  clientY = 0;

  lastSelection = null;

  constructor () {
    document.addEventListener('contextmenu', (e) => {
      console.log(0, e);
    });

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

    document.addEventListener('mouseup', (e) => {
      this.lastSelection = this.getSelection();
    });
  }

  get x () {
    return this.clientX;
  }
  get y () {
    return this.clientY;
  }

  getSelection () {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
  }

  restoreSelection () {
    const range = this.lastSelection;

    if (range) {
      if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.selection && range.select) {
        range.select();
      }
    }
  }
};
