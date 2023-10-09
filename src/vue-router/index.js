import createMatcher from './create-matcher';
import HashHistory from './history/hash';
import BrowserHistory from './history/history';
import install from './install';

export default class VueRouter {
    // routes
    constructor(options) {
        let routes = options.routes || [];
        this.beforeEachHooks = [];

        // 创建一个匹配器，这个匹配器是一个对象，会包含多个方法
        this.matcher = createMatcher(routes);

        let mode = options.mode || 'hash'; // hash | history

        if (mode === 'hash') {
            this.history = new HashHistory(this);
        } else if (mode === 'history') {
            this.history = new BrowserHistory(this);
        }
    }

    match(location) {
        return this.matcher.match(location);
    }

    push(location) {
        this.history.push(location)

    }

    beforeEach(cb) {
        this.beforeEachHooks.push(cb);
    }

    init(app) {
        let history = this.history;

        // 根据路径找到对应的组件进行渲染, 并监听路由变化
        history.transitionTo(history.getCurrentLocation(), () => {
            history.setupListener(); // 初始化时监听路由
        });

        // 传入一个回调函数，每次路由切换的时候都需要调要listen方法中的回调函数
        history.listen((newRoute) => {
            app._route = newRoute;
        });
    }
}

// 1. 将用户的配置进行映射
// 2. 将实例注入的router属性共享给每个组件

VueRouter.install = install;
