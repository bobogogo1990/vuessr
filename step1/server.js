const Vue = require('vue');
const server = require('express')();
// ***************** step1 *****************
// const renderer = require('vue-server-renderer').createRenderer();
// ***************** step1 *****************

// ***************** step2 *****************
// const renderer = require('vue-server-renderer').createRenderer({
//   template: require('fs').readFileSync('./index.template.html', 'utf-8')
// });
// ***************** step2 *****************

// // ***************** step3 *****************
const createApp = require('./app');
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
});
// ***************** step3 *****************

const context = {
  title: 'ssr step2',
  meta: `
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
    <meta name="format-detection" content="telphone=no, email=no">
  `
};


server.get('*', (req, res) => {

  // ***************** step2 *****************
  // const app = new Vue({
  //   data: {
  //     url: req.url,
  //     username: '小明',
  //     level: '高级会员'
  //   },
  //   template: `<div>
  //       <div>访问的 URL 是： {{ url }}</div>
  //       <p>用户名：{{username}}</p>
  //       <p>级别：{{level}}</p>
  //   </div>`
  // });
  // ***************** step2 *****************

  // ***************** step3 *****************
  const appContext = { url: req.url, username: '小明', level: '高级会员' };
  const app = createApp(appContext);
  // ***************** step3 *****************

  renderer.renderToString(app, context,(err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error');
      return
    }

    console.log('render text = ', html);
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    // ***************** step1 *****************
    // res.end(`
    //   <!DOCTYPE html>
    //   <html lang="en">
    //     <head><title>Hello</title></head>
    //     <body>${html}</body>
    //   </html>
    // `);
    // ***************** step1 *****************

    // ***************** step2 *****************
    res.end(html);
    // ***************** step2 *****************
  })
});

server.listen(3000);
