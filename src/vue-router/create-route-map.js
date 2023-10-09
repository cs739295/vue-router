// 映射数据结构为{'/', {path, component, ...}} 这种形式
// 将routes 的嵌套结构打平
export default function createRouteMap(routes, pathMap = {}) {
    routes.forEach(route => {
        addRouteRecord(route, pathMap)
    })
    return { pathMap }
}


function addRouteRecord(route, pathMap, parentRecord) {
    let path = parentRecord ? `${parentRecord.path === '/' ? '/' : `${parentRecord.path}/`}${route.path}` : route.path
    let record = {
        path: path,
        component: route.component,
        props: route.props,
        meta: route.meta,
        parent: parentRecord
    }
    if(!pathMap[path]) {
        pathMap[path] = record;
    }
    route.children && route.children.forEach(childRoute => {
        addRouteRecord(childRoute, pathMap, record)
    })
}