import ElTeaMenu from './src/menu-tea';

/* istanbul ignore next */
ElTeaMenu.install = function(Vue) {
  Vue.component(ElTeaMenu.name, ElTeaMenu);
};

export default ElTeaMenu;
