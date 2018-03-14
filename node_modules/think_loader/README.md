# think_loader

Loader for ThinkKoa

# Install
-----

```
npm i think_loader --save
```

# API

## loader(loadPath, options, skip)

loadPath 加载文件目录
options.suffix 加载文件后缀名
options.filter 加载文件过滤器
options.prefix ''仅加载一级子目录 '/'递归加载深层子目录
options.skip 是否跳过当前一级子目录 

### examples

```
//加载当前路径下所有js文件
loader(path.dirname(__dirname), {
    suffix: '.js'
});

```