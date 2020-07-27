import Quill from 'quill';

const defaultOptions = {
  theme: 'snow',
  modules: {
    toolbar: false
  },
  boundary: document.body, // FIXME: Should probably be parent element.
  readOnly: false
};

const quillFactory = (el) => new Quill(el, defaultOptions);

const getQuill = () => {

};

export {
  quillFactory
};
