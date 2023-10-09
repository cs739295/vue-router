export default {
    functional: true,
    render(h, {parent, data}) {

        // 基本知识：渲染顺序，从父到子
        // 先渲染app.vue 中的router-view
        // 然后是 about 总的router-view
        // 因此需要拿到当前的route


        // router-view 的父组件上保留着当前的$route。就是base.js中的current。记录着route的层级关系
        let route = parent.$route;
        let depth = 0;
        // 每个routerView渲染，都自定一个routerView属性为true。表示当前渲染的组件是routerView
        data.routerView = true;

        while(parent) {
            if(parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent;
        }


        let record = route.matched[depth];

        if(!record) {
            return h()
        }

        return h(record.component, data);

    }
}