// 获取当前location匹配上的组件集合
function createRoute(record, location) {
    let matched = [];
    while (record) {
        matched.unshift(record);
        record = record.parent;
    }

    return {
        ...location,
        matched,
    };
}

function runQueue(queue, from, to, cb) {
    function next(index) {
        if (index >= queue.length) return cb();

        let hook = queue[index];

        hook(from, to, () => next(index + 1));
    }

    next(0);
}

class Base {
    constructor(router) {
        this.router = router;

        // 根据路径匹配到当前的路由信息，包括父级的路由信息
        this.current = createRoute(null, {
            path: '/',
        });
    }
    transitionTo(location, listener) {
        const record = this.router.match(location);

        // /about/a： 表示要渲染两个组件，先渲染/about 对应的组件，然后渲染/about/a 对应的组件
        let route = createRoute(record, { path: location });

        // 避免默认值 与 初始化的path相同，导致match错误
        // {path: '/', matched: []}
        // {path: '/', matched: [...]}

        if (
            location === this.current.path &&
            route.matched.length === this.current.matched.length
        ) {
            // 表示时重复的跳转
            return;
        }

        let queue = [].concat(this.router.beforeEachHooks);

        // 每次路由变化时都会走这个逻辑
        runQueue(queue, this.current, route, () => {
            this.current = route;
            // current变化时需要渲染视图，因此current应该是一个响应式的对象
            listener && listener();
            this.cb && this.cb(this.current);
        });
    }
    listen(cb) {
        this.cb = cb;
    }
}

export default Base;
