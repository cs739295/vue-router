import createRouteMap from './create-route-map';

/**
 * 创建一个匹配器
 */
export default function createMatcher(routes) {


    const { pathMap } = createRouteMap(routes);

    function addRoutes(routes) {
        createRouteMap(routes, pathMap);
    }

    function addRoute(route) {
        createRouteMap([route], pathMap);
    }

    function match(location) {
        return pathMap[location];
    }
    return {
        addRoute, // 添加一个路由
        addRoutes, // 添加多个路由
        match, // 给一个路径，返回对应的路由
    };
}
