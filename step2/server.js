const path = require('path');
const express = require('express');
const app = express();
const { createBundleRenderer } = require('vue-server-renderer');
const resolve = file => path.resolve(__dirname, file);
const isProd = process.env.NODE_ENV === 'production';

let renderer;
let readyPromise;
// 模板文件
const templatePath = resolve('./src/index.template.html');

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    runInNewContext: false
  }))
}

if (isProd) {}
else {
  readyPromise = require('./build/setup-dev-server')(
      app,
      templatePath,
      (bundle, options) => {
        renderer = createRenderer(bundle, options)
      }
  )
}

// 服务器缓存配置
const serve = (path, cache = true) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});
app.use('/dist', serve('./dist'));
app.use('/public', serve('./public'));

function render(req, res) {
  res.setHeader("Content-Type", "text/html");
  const context = { title: 'Step2', url: req.url };

  renderer.renderToString(context, (err, html) => {
    res.send(html);
  });
}


// 执行渲染
app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
});

// 启动服务
app.listen(3000);
