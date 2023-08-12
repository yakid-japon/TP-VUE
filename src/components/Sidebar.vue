
<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <RouterLink to="/"  :class="isLinkActive('/')" exact>
                    Acceuil
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/add/images"  :class="isLinkActive('/add/images')" exact>
                    Ajouter Images
                </RouterLink>
                <a href="#" class="">
                 
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-dark">
                    Déconnexion
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
    import { RouterLink, RouterView ,useRoute} from 'vue-router'
    const route = useRoute()
    function isLinkActive (path){
        return route.path === path ?"active nav-link":"nav-link link-dark"
    }
</script>