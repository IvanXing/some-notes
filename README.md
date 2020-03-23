## 1. Redux 项目结构组织方式

- 按照类型
  - 新增功能模块需要新增很多分布在不同文件夹下的文件
  ```
  actions/ action1.js && action2.js ...
  reducers/ index.js && reducer1.js && reducer2.js ...
  components/ components1.js && comonents2.js ...
  containers/ container1.js && container2.js ...
  ```
- 按照功能模块
  - 不同功能模块之间状态耦合会找错处理分支
  ```
  feature1/ components/ && Container.js && actions.js && reducer.js
  feature2/ components/ && Container.js && actions.js && reducer.js
  ```
- Ducks
  - ducks-modular-redux
  - reducers、action types、actions 组合到一个文件中作为独立模块
  - 划分模块依据：应用状态 State，而不是界面功能

## 2. State 的设计原则

- 2.1 数据按照领域（Domain）分类，存储在不同的表中，不同的表中存储的列数据不能重复
  - 把整个应用的状态按照领域分成若干个 State，各个 State 之间不能保存重复的数据
- 2.2 表中每一列的数据都依赖于这张表的主键
  - 表中 State 以键值对的结构存储数据，以记录的 Key/ID 作为记录的索引，记录中的其它字段都依赖于索引
- 2.3 表中除了主键以外的其它列，互相之间不能有直接依赖关系

  - State 中不能保存可以通过已有数据计算而来的数据，即 State 中的字段不能互相依赖

- 2.4 State 应该尽量扁平化（避免嵌套层级过深）
- 2.5 UI State 具有松散性，应该合并，从而避免一级节点过多
- 2.6 常见两种错误
  - 以 API 为设计 State 的依据
  - 以页面 UI 为设计 State 的依据

## 3. Middleware

- redux-thunk：增强 store dispatch 的能力（发送 action），把只能处理对象升级成可以处理函数
- Function:({ getState, dispatch }) => next => action

  - 中间件函数会先接收一个对象作为参数，返回一个新的函数，新的函数接收一个 next 参数，再返回一个函数，再接收一个 action 参数

  ```js
  const logger = ({ getState, dispatch }) => next => action => {
    console.group(action.type);
    console.log("dispatching:", action);
    const result = next(action);
    console.log("next state:", getState());
    console.groupEnd();
    return result;
  };
  ```

## 4. 常用库

- immutable.js: 操作不可变对象，需要先拷贝一份对象再进行操作，对象嵌套过深拷贝效率低，immutable 是为了简化操作和提高效率
- reselect：数据不变，不重复渲染

```js
// createSelector api应用
const mySelector = createSelector(
  state => state.values.value1,
  state => state.values.value2,
  (value1, value2) => value1 + value2
);
// You can also pass an array of selectors
const totalSelector = createSelector(
  [state => state.values.value1, state => state.values.value2],
  (value1, value2) => value1 + value2
);
```

## 5. React Router 4

- MPA & SPA
  - Multiple Page App：不同 URL 返回不同 HTML，有利于爬虫 SEO，切换时有白屏加载
  - Single Page App：URL 发生变化，公用部分不重复加载，性能较好，用户体验好
- 服务端路由 & 客户端路由
  - 服务端路由：浏览器访问不同 URL（http://a），服务器返回不同html（a.html）
  - 客户端路由：http://a 返回 index.html，http://b 返回 index.html，具体拆解是浏览器做的
- <Router>
  - <BrowserRouter>：在客户端实现URL的切换，并与具体页面对应，内部实现基于HTML5 history API
  - <HashRouter>：使用URL的hash部分作为路由信息，为了兼容老版本浏览器
- 三种路由渲染组件方式

```js
<Router>
  <div>
    <Nav />
    <Route path="/home" exact component={Home} />
    <Route path="/about" render={props => <About {...props} />} />
    <Route
      path="/contact"
      children={props => <div>{props.match ? "active" : "inactive"}</div>}
    />
  </div>
</Router>
```
