<template>
    <div class="home">
        <div>this is page home</div>
        <router-link to="/a" tag="span">切a</router-link> |
        <router-link to="/b">切b</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'Home1',
    components: {
        HelloWorld,
    },
};
</script>
