<template>
    <div class="about">
        <h1>This is an about page</h1>
        <router-link to="/about/a" tag="span">切a</router-link> |
        <router-link to="/about/b">切b</router-link>
        <router-view></router-view>
    </div>
</template>
