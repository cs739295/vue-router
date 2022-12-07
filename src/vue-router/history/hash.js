import Base from './base'

// 初始化话是默认给一个 /
function ensureSlash() {
    if(window.location.hash) {
        return
    }
    window.location.hash = '/' // 没有hash的时候默认给一个
}

// 获取hash 模式下的路径
function getHash() {
    return window.location.hash.slice(1);
}
class HashHistory extends Base {
    constructor(router) {
        super(router);

        // hash 路由时，初始化会赋值一个 /
        ensureSlash()
    }


    // 监听hash的变化
    setupListener() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(this.getCurrentLocation())
        })
    }
    getCurrentLocation() {
        return getHash()
    }
    push(location) {
        this.transitionTo(location, () => {
            window.location.hash = location;
        });
    }
}


export default HashHistory