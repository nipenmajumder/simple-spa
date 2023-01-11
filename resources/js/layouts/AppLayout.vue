<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">

            <Sidebar/>
            <!-- Layout container -->
            <div class="layout-page">

                <Navbar/>

                <!-- Content wrapper -->
                <div class="content-wrapper">

                    <Dashboard/>

                    <Footer/>

                    <div class="content-backdrop fade"></div>
                </div>
                <!-- Content wrapper -->
            </div>
            <!-- / Layout page -->
        </div>

        <!-- Overlay -->
        <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    <!-- / Layout wrapper -->

</template>

<script>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import Dashboard from "./Dashboard.vue";
export default {
    name: "AppLayouts",
    components: {
        Sidebar,
        Navbar,
        Dashboard,
        Footer,
    },
}
</script>

<style scoped>

</style>
