// main.js
import Vue from 'vue'
import VueResource from 'vue-resource';
// require a *.vue component
import App from './components/App.vue'

Vue.use(VueResource);

// mount a root Vue instance
new Vue({
    el: 'body',
    components: {
        app: App
    }
});