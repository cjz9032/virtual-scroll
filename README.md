---
## vue2 多入口

## 为什么需要多入口
  单文件build.js太大了~其他什么解决团队协作巴拉巴拉都是骗人的,即使单入口也能做到改良:)

## 解决方案
	后端:nginx该怎么配怎么配,不讲
	前端:webpack本身是支持多入口的,非常好配置.唯一的问题是将手工配置改成自动配置.
	所以要根据一定规则切分模块,写脚本统一处理.
	多提一点:如果仍然需要spa,自己灵活修改规则就好,比如放在某个文件夹下仍然生成spa(seed中实现"切分single文件夹")

## 使用
	该项目只是作为演示用,只需要将关键代码部分ctrlCV即可

### 目录结构
``` bash
/root
	......
    |---src  开发目录
		......
        |---module 所有业务模块
              |---multi 多页应用模块
                  |--- a模块
                        |--- app.vue
                        |--- index.html
                        |--- index.js
                  |--- b模块
                        |--- app.vue
                        |--- index.html
                        |--- index.js
              |---single 单页



```



`注意：`请保持module下的各模块的目录结构一致；



### 关键代码
1、在webpack中配置项目公用的JS文件，并提取打包到指定目录；
由于是多页应用，必然会有多个入口，本架构会将`module`下的所有js文件作为入口文件；所以公共文件的提取需要在入口文件处单独处理，配置如下：
``` bash
# 入口文件
var entries = getEntry('./src/module/**/**/*.js');

```

2、配置js(html)输出路径
如下文件输出路径请根据项目结构需要做相应修改。
``` bash
# 输出路径
glob.sync(globPath).forEach(function (entry) {
  basename = path.basename(entry, path.extname(entry));
  //过滤非入口文件的JS：routers.js和vuex/*.js
  if(basename.indexOf('routers') !== -1 || entry.indexOf('vuex/') !== -1) return;
  // 原路径：entry = ‘src/module/multi/list/index.js’
  tmp = entry.split('/').splice(-3);
  // 分解后：tmp = [multi,list,index.js]
  pathname =  tmp.slice(0, 2).join('/') + '/' + basename;
  // 正确输出js和html的路径: pathname = 'multi/list/index'
  entries[pathname] = entry;
});
```

## TODO
  1.如常见的单入口多入口共存的需求,以及其他的一些常见构建上的需求,实现在该项目中(因为新人不会自己实现...)
