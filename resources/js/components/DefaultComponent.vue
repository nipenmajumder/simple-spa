<template>
    <main>
        <router-view :key="$route.path" />
    </main>
</template>

<script>
export default {
    name: "DefaultComponent"
}
</script>

<style scoped>

</style>
