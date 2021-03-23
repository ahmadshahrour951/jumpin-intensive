const Handlebars = require('handlebars');
const { library, dom, icon } = require('@fortawesome/fontawesome-svg-core');
const fas = require('@fortawesome/free-solid-svg-icons').fas;
// const fab = require('@fortawesome/free-brands-svg-icons').fab;

library.add(fas);
// library.add(fab);

module.exports = {
  'fontawesome-css': function () {
    return new Handlebars.SafeString(dom.css());
  },
  fas: function (args) {
    return new Handlebars.SafeString(
      icon({ prefix: 'fas', iconName: args.hash.icon }).html
    );
  },
  // fab: function (args) {
  //   return new Handlebars.SafeString(
  //     icon({ prefix: 'fas', iconName: args.hash.icon }).html
  //   );
  // },
};
