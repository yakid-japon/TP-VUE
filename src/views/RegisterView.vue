<template>
    <Form class="row  w-100 justify-content-center h-100 align-items-center" :validation-schema="schema" @submit="onSubmit">
        <div class="col-md-6">
            <div class="row mb-3 justify-content-center ">
                <h3 class="text-center">Inscription</h3>
            </div>
             <v-if store.errorMessage>
                <div class="row mb-3 justify-content-center ">
                    <p class="text-center">{{ store.errorMessage }}</p>
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
                <label class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <Field name="password" type="password" class="form-control mb-3" />
                    <ErrorMessage name="password" class="mt-2" />
                </div>
            </div>
            <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Confirmer mot passe</label>
                <div class="col-sm-10">
                    <Field name="password_conf" type="password" class="form-control mb-3" />
                    <ErrorMessage name="password_conf" class="mt-2" />
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <RouterLink to="/login">
                    J'ai deja un compte
                </RouterLink>
                <button type="submit" class="btn btn-primary mb-3 px-4">Register</button>
            </div>
        </div>
    </Form>
</template>

<script  setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { RouterLink, RouterView } from 'vue-router'
import * as yup from 'yup';
import { useUserStore } from '@/stores/user.js'
const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    password_conf: yup.string().required().min(8),
});
const store = useUserStore()
function onSubmit(values) {
    store.register(values);
}
</script>   
