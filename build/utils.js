var path = require('path')
var glob = require('glob')

// 获取入口文件路径
exports.getEntry = function (globPath) {
  var entries = {},
    basename,
    tmp,
    pathname
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    //...你是傻比吗 加白名单啊 single: js.html mult 再加下 谢谢
    if (entry.indexOf('/single/home/index') === -1) {
      return
    }

    // 原路径：‘./src/module/mulit/list/index.js’
    // 分解后：[multi,list,index.js]
    tmp = entry.split('/').splice(-3)

    // * 输出js和html的路径
    pathname = tmp.slice(0, 2).join('/') + '/' + basename
    entries[pathname] = entry
  })
  console.log(entries)
  return entries
}
