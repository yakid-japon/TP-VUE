
<template>
    <Form class="row  w-100 justify-content-center h-100 align-items-center" :validation-schema="schema" @submit="onSubmit">

        <div class="col-md-6">
            <div class="row mb-3 justify-content-center ">
                <h3 class="text-center">Connexion</h3>
            </div>
             <v-if userStore.errorMessage>
                <div class="row mb-3 justify-content-center ">
                    <p class="text-center">{{ userStore .errorMessage }}</p>
                </div>
             </v-if>
            <div class="mb-3 row ">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <Field name="email" type="email" class="form-control mb-3" />
                    <ErrorMessage name="email" />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <Field name="password" type="password" class="form-control mb-3" />
                    <ErrorMessage name="password" />
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <RouterLink to="/register">
                    Vous n'avez pas de compte ?
                </RouterLink>
                <button type="submit" class="btn btn-primary mb-3 px-4">Login</button>
            </div>
        </div>
    </Form>
</template>

<script setup >
import { RouterLink, RouterView } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import {useUserStore} from '@/stores/user.js'
const userStore = useUserStore()
const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
});

function onSubmit(values) {
    userStore.login(values)
}
</script>   

