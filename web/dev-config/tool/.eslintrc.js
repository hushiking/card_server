// const eslintrc = {
//     "parserOptions": {
//       "ecmaVersion" : 8
//     },
//     "env": {
//       "es6": true,
//       "node": true
//     },
//     // "extends": "eslint:recommended",
  
//     // 规则按照首字母在字母表升序排序
//     "rules": {
  
//       // 单行代码块大括号后需要一个空格
//       "block-spacing": 2,
  
//       // 不使用外部块定义的变量
//       "block-scoped-var": 1,
  
//       // 大括号位置
//       "brace-style": [2, "1tbs"],
  
//       // 变量命名规则
//       "camelcase": [0, { "properties": "never" }],
  
//       // 逗号后使用空格
//       "comma-spacing": 2,
  
//       // 逗号位置
//       "comma-style": [2, "last"],
  
//       // 要求使用一致的 return 语句
//       "consistent-return": 2,
  
//       // 使用语句大括号
//       "curly": [2, "all"],
  
//       // 需要default在SwitchCase
//       "default-case": 2,
  
//       // 属性读取方式
//       // `foo['bar'] -> foo.bar`
//       "dot-notation": [1, { "allowKeywords": true }],
  
//       // 要求或禁止文件末尾保留一行空行
//       "eol-last": 0,
  
//       // 相等判断尽可能使用`===`
//       "eqeqeq": 1,
  
//       // 使用函数声明还是是函数表达式
//       "func-style": ["error", "expression"],
  
//       // 缩进空格
//       // `SwitchCase`时需要一个空格
//       "indent": [2, 4, {"SwitchCase": 1, "MemberExpression": 0}],
  
//       // 分号之间的空格
//       "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
  
//       // 换行符格式
//       "linebreak-style": [2, "unix"],
  
//       // 要求构造函数首字母大写
//       "new-cap": 0,
  
//       // 类构建函数需要括号
//       "new-parens": 2,
  
//       // 不允许使用`alert`函数
//       "no-alert": 2,
  
//       // 数组尽量不使用构造函数
//       "no-array-constructor": 2,
  
//       // 不使用`console`
//       "no-console": 0,
  
//       //不允许改变用const声明的变量
//       "no-const-assign": 2,
  
//       // 不使用`var x; delete x;`
//       "no-delete-var": 2,
  
//       //禁止空块语句
//       "no-empty": 1,
  
//       // 不使用`eval`
//       "no-eval": 2,
  
//       //禁用不必要的分号
//       "no-extra-semi": 2,
  
//       // 不允许扩展原生类型
//       "no-extend-native": 2,
  
//       // 不使用不必要的bind
//       "no-extra-bind": 2,
  
//       // 不允许不停止SwitchCase的
//       "no-fallthrough": 2,
  
//       // 使用显式的浮点数定义
//       // `.5 -> 0.5`
//       "no-floating-decimal": 2,
  
//       // 不使用非显式的函数执行
//       // `setTimeout("alert('Hi!');", 100);`
//       "no-implied-eval": 2,
  
//       // 不使用非显式this关键字
//       "no-invalid-this": 1,
  
//       // 不使用非遍历情况的label
//       "no-labels": 2,
  
//       // 不使用和变量同名的便签名
//       "no-label-var": 2,
  
//       // 禁止循环中存在函数
//       "no-loop-func": 2,
  
//       // 不允许缩进不统一
//       "no-mixed-spaces-and-tabs": [2],
  
//       // 不允许重复使用分隔空格
//       "no-multi-spaces": 2,
  
//       // 不允许转义换行符连接字符串
//       "no-multi-str": 2,
  
//       // 不允许赋值到关键字
//       "no-native-reassign": 2,
  
//       // 不嵌套ternary
//       // `var foo = bar ? baz : qux === quxx ? bing : bam;`
//       "no-nested-ternary": 2,
  
//       // 使用`new`需要赋值
//       "no-new": 2,
  
//       // 禁用Function构造函数
//       // `var x = new Function("a", "b", "return a + b");`
//       "no-new-func": 2,
  
//       // 禁止使用 Object 构造函数
//       "no-new-object": 2,
  
//       // 原始类型不使用`new`
//       // `typeof new String('foo') == 'object'`
//       // `typeof String('foo') == 'string'`
//       "no-new-wrappers": 2,
  
//       // 不使用八进制数字
//       // `var num = 071; -> 57`
//       "no-octal": 2,
//       "no-octal-escape": 2,
  
//       // 不使用被废弃的`__proto__`
//       "no-proto": 2,
  
//       //禁用 process.exit()
//       "no-process-exit": 1,
  
//       // 不重复声明变量
//       "no-redeclare": 2,
  
//       // 返回语句不赋值
//       "no-return-assign": 2,
  
//       // 不使用不加括号的逗号运算符
//       "no-sequences": 2,
  
//       // 禁止变量声明覆盖外层作用域的变量
//       "no-shadow": [2, { "builtinGlobals": false, "hoist": "functions", "allow": [] }],
  
//       //禁用行尾空白
//       "no-trailing-spaces": 0,
  
//       //在构造函数中禁止在调用super()之前使用this或super
//       "no-this-before-super": 2, 
  
//       //禁用未声明的变量
//       "no-undef": 2,
  
//       //禁止标识符中有悬空下划线
//       "no-underscore-dangle": 0,
  
//       //禁止在 return、throw、continue 和 break 语句后出现不可达代码
//       "no-unreachable": 1, 
  
//       //禁止未使用过的变量
//       "no-unused-vars": 1,
  
//       // 引号
//       "quotes": [2, "single", {"avoidEscape": true, "allowTemplateLiterals": true}],
  
//       // 分号
//       "semi": [2, "always"],     
  
//       //强制 typeof 表达式与有效的字符串进行比较
//       "valid-typeof": 2,
  
//       //要求或者禁止Yoda条件
//       "yoda": 0
//     },
//     "globals": {
//       "echo": true
//     }
//   }

const eslintrc = {
    // extends: ["eslint-config-airbnb"],
    env: {
        browser: true,
        node: true,
        jasmine: true,
        jest: true,
        es6: true
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    plugins: ["markdown", "react", "babel", "jest"],
    rules: {
        // 禁止使用alert confirm prompt
        "no-alert": 1,
        // 禁止使用数组构造器
        "no-array-constructor": 2,
        // 禁止使用arguments.caller或arguments.callee
        "no-caller": 1,
        // 禁止catch子句参数与外部作用域变量同名
        "no-catch-shadow": 1,
        // 禁止给类赋值
        "no-class-assign": 2,
        // 禁止在条件表达式中使用赋值语句
        "no-cond-assign": 2,
        // 禁止在条件表达式中使用赋值语句
//        "no-console": 1,
        // 禁止修改const声明的变量
        "no-const-assign": 2,
        // 禁止在条件中使用常量表达式 if(true) if(1)
        "no-constant-condition": 2,
        // 禁止使用debugger
        "no-debugger": 1,
        // 不能对var声明的变量使用delete操作符
        "no-delete-var": 2,
        // 不能使用看起来像除法的正则表达式/=foo/
        "no-div-regex": 1,
        // 不能使用看起来像除法的正则表达式/=foo/
        "no-dupe-keys": 2,
        // 不能使用看起来像除法的正则表达式/=foo/
        "no-dupe-args": 2,
        // switch中的case标签不能重复
        "no-duplicate-case": 2,
        // 如果if语句里面有return,后面不能跟else语句:该规则旨在突出含有 return 语句的 if 语句后的不必要的代码。因此，当else 语句出现在含有 return 语句的 if 语句之后，该规则将发出警告。
        "no-else-return": 1,
        // 块语句中的内容不能为空
        "no-empty": ["error", { "allowEmptyCatch": true }],
        // 正则表达式中的[]内容不能为空
        "no-empty-character-class": 2,
        // 禁止使用空label
        "no-labels": 2,
        // 禁止使用空label
        "no-eq-null": 2,
        // 禁止使用eval
        "no-eval": 1,
        // 禁止给catch语句中的异常参数赋值
        "no-ex-assign": 2,
        // 禁止扩展native对象
        "no-extend-native": 1,
        // 禁止多余的冒号
        "no-extra-semi": 2,
        // 禁止switch穿透,当你不想要落空时是没有问题的，但是，如果落空是有意为之呢，没有办法来表明这一点。使用匹配 /falls?\s?through/i 的正则表达式的注释来表明落空是有意为之的，，被认为是一个最佳实际。
        "no-fallthrough": 1,
        // 禁止省略浮点数中的0 .5 3.
        "no-floating-decimal": 2,
        // 禁止重复的函数声明
        "no-func-assign": 2,
        // 禁止无效的正则表达式
        "no-invalid-regexp": 2,
        // 禁止无效的正则表达式
        "no-invalid-this": 2,
        // 禁止使用__iterator__ 属性
        "no-iterator": 2,
        // 禁止不必要的嵌套块
        "no-lone-blocks": 2,
        // 禁止else语句内只有if语句
        "no-lonely-if": 2,
        // 禁止else语句内只有if语句
        "no-loop-func": 1,
        // 不能用多余的空格
        "no-multi-spaces": [
            "error",
            {
                "exceptions": {
                    "BinaryExpression": true,
                    "VariableDeclarator": true,
                    "ImportDeclaration": true
                }
            }
        ],
        // 空行最多不能超过3行
        "no-multiple-empty-lines": [1, {"max": 3}],
        // 不能重写native对象
        "no-native-reassign": 2,
        // in 操作符的左边不能有!
        "no-negated-in-lhs": 2,
        // 禁止使用嵌套的三目运算
        "no-nested-ternary": 1,
        // 禁止使用嵌套的三目运算
        "no-new": 1,
        // 禁止使用new Function
        "no-new-func": 1,
        // 禁止使用new Function
        "no-new-object": 2,
        // 禁止使用new require
        "no-new-require": 2,
        // 禁止使用new require
        "no-new-wrappers": 2,
        // 禁止使用new require
        "no-obj-calls": 2,
        // 禁止使用八进制数字
        "no-octal": 1,
        // 禁止使用八进制转义序列
        "no-octal-escape": 1,
        // 禁止给参数重新赋值
        "no-param-reassign": 1,
        // 禁止使用__proto__属性
        "no-proto": 1,
        // 禁止重复声明变量
        "no-redeclare": 2,
        // 不能比较自身
        "no-self-compare": 2,
        // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
        "no-shadow": 2,
        // 函数调用时 函数名与()之间不能有空格
        "no-spaced-func": 2,
        // 禁止稀疏数组， [1,,2]
        "no-sparse-arrays": 2,
        // 一行结束后面不要有空格
        "no-trailing-spaces": 1,
        // 不能有未定义的变量
        "no-undef": 1,
        // 变量初始化时不能直接给它赋值为undefined
        "no-undef-init": 2,
        // 变量初始化时不能直接给它赋值为undefined
        // "no-undefined": 2,
        // 不能有无法执行的代码
        "no-unreachable": 2,
        // 不能有无法执行的代码
        "no-unused-expressions": 2,
        // 不能有声明后未被使用的变量或参数
        "no-unused-vars": [1, {"vars": "all", "args": "after-used"}],
        // 未定义前不能使用
        // "no-use-before-define": 2,
        // 未定义前不能使用
        "no-useless-call": 2,
        // 禁用with
        "no-with": 2,

        // 是否允许非空数组里面有多余的空格
        "array-bracket-spacing": [2, "never"],
        // 大括号风格
        "brace-style": [1, "1tbs", { "allowSingleLine": true }],
        // 避免多次调用回调什么的
        "callback-return": 0,
        // 强制在单行代码块中使用一致的空格
        "block-spacing": 2,
        // 对象字面量项尾不能有逗号
        "comma-dangle": [2, "never"],
        // 逗号前后的空格
        "comma-spacing": 2,
        // 逗号风格，换行时在行首还是行尾
        "comma-style": [2, "last"],
        // 循环复杂度
        "complexity": [0, 11],
        // 是否允许计算后的键名什么的
        "computed-property-spacing": [1, "never"],
        // return 后面是否允许省略
        "consistent-return": 0,
        // 必须使用 if(){} 中的{}
        "curly": [1, "all"],
        // switch语句最后必须有default
        "default-case": 2,
        // 避免不必要的方括号
        "dot-notation": [2, { "allowKeywords": true }],
        // 避免不必要的方括号
        "eol-last": 0,
        // 必须使用全等
        "eqeqeq": 2,
        // 必须使用全等
        "indent": [2, 4],
        // 对象字面量中冒号的前后空格
//        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "key-spacing": 2,
        // new时必须加小括号
        "new-parens": 2,
        // 连续声明
        "one-var": [2, "never"],
        // 换行时运算符在行尾还是行首
        "operator-linebreak": [2, "none"],
        // 使用单引号
        "quotes": [1, "single", "avoid-escape"],
        // 对象字面量中的属性名是否强制双引号
        "quote-props":[2, "as-needed"],
        // 语句强制分号结尾
        "semi": [1, "always"],
        // 分号前后空格
        "semi-spacing": [0, {"before": false, "after": false}],
        // 强制关键字周围空格的一致性,(默认) 要求在关键字之前至少有一个空格,(默认) 要求在关键字之后至少有一个空格
        "keyword-spacing": 1,
        // 注释风格要不要有空格什么的
        "spaced-comment": 2,
        // 禁止比较时使用NaN，只能用isNaN()
        "use-isnan": 2,
        // 禁止比较时使用NaN，只能用isNaN()
        "valid-typeof": 2,
        // var必须放在作用域顶部
        "vars-on-top": 2,

        // ------------------------------------- React ----------------------------------- //
        "react/display-name": 0,
        "jsx-quotes": 1,
        "react/jsx-no-undef": 2,
        "react/jsx-uses-react": 2,
        "react/no-multi-comp":[2 ,{ "ignoreStateless": true }],
        "react/jsx-uses-vars": 2,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-direct-mutation-state": 2,
        "react/no-find-dom-node": 2,
        "react/no-is-mounted": 2,
        "react/prefer-es6-class": 2,
        "react/prefer-stateless-function": 0,
        "react/no-unknown-property": 2,
        "react/prop-types": 2,
        "react/react-in-jsx-scope": 2,
        "react/require-render-return": 2,
        "react/self-closing-comp": 2,
        "react/sort-comp": [1, {
            "order": [
                "static-methods",
                "lifecycle",
                "everything-else",
                "render"
            ],
            "groups": {
                "rendering": [
                    "/^render.+$/",
                    "render"
                ]
            }
        }],
        "react/style-prop-object": 2,
        "react/jsx-closing-bracket-location": [2, {"selfClosing": "after-props", "nonEmpty": "after-props"}],
        "react/jsx-equals-spacing": [2, "never"],
        "react/jsx-filename-extension": [2, { "extensions": [".jsx", ".js"] }],
        "react/jsx-first-prop-new-line": [2, "multiline"],
        "react/jsx-handler-names": [2],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "react/jsx-key": 2,
        "react/jsx-max-props-per-line": [2, {"maximum": 5}],
        "react/jsx-no-duplicate-props": [2, {"ignoreCase": true}],
        "react/jsx-pascal-case": [2],
        "react/jsx-tag-spacing": 2,
        "react/jsx-tag-spacing": [2, {
            "beforeSelfClosing": "always"
        }],
        "react/jsx-wrap-multilines": [1, {"declaration": true, "assignment": false, "return": true}]
    },
    "settings": {
        "react": {
            "createClass": "createClass", // Regex for Component Factory to use, default to "createClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "15.5.4" // React version, default to the latest React stable release
        }
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "blockBindings": true
        }
    }
};

module.exports = eslintrc;
