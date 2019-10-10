import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import {
  blue,
  lightBlue,
  white
} from '../styles/global/colors.scss';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: white,
        secondary: lightBlue,
        accent: blue,
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
});
