import RouterLink from './components/router-link';
import RouterView from './components/router-view';

export  let Vue;

export default function install(_Vue) {
    Vue = _Vue


    Vue.mixin({
        beforeCreate() {
            // 现在所有的组件上都有一个属性_routerRoot，指向 Vue 根实例
            if(this.$options.router) {
                // 当前实例表示是根实例
                this._routerRoot = this;
                this._router = this.$options.router;
                // 调用router实例的初始化方法 init
                this._router.init(this);

                // 将base.js中的current变为响应式的
                Vue.util.defineReactive(this, '_route', this.$router.history.current)

            } else {
                // 当前实例不是根实例
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
        }
    })
    // 拦截$router, 最后都会走这个拦截器
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot && this._routerRoot._router;
        }
    })
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot && this._routerRoot._route;
        }
    })


    Vue.component('router-link', RouterLink)
    Vue.component('router-view', RouterView)
}