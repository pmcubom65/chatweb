import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';

import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css' ;

Vue.use(Vuetify);

export default new Vuetify({

  theme: {
    themes: {
      
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
        background: colors.indigo.lighten5, 
      },
    },
 
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },


    lang: {
      locales: { es },
      current: 'es',
    },
});
