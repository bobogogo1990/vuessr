const Vue = require('vue');

module.exports = function createApp (context) {
  return new Vue({
    data: {
      ...context
    },
    template: `<div>
        <p>访问的 URL 是： {{ url }}</p>
        <p>用户名：{{username}}</p>
        <p>级别：{{level}}</p>
    </div>`
  });
};
