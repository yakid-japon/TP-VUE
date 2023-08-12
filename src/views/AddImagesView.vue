
<template>
    <Form class="row  w-100 justify-content-center h-100 align-items-center" :validation-schema="schema" @submit="onSubmit">

        <div class="col-md-6">
            <v-if userStore.errorMessage>
                <div class="row mb-3 justify-content-center ">
                    <p class="text-center">{{ userStore.errorMessage }}</p>
                </div>
            </v-if>
            <div class="mb-3 row ">
                <label for="staticEmail" class="col-sm-2 col-form-label">Image</label>
                <div class="col-sm-10">
                    <Field name="fileName" type="file" class="form-control mb-3" @change='fileInputChange'/>
                    <ErrorMessage name="fileName" />
                </div>
            </div>
            <div class="mb-3 row ">
                <label for="staticEmail" class="col-sm-2 col-form-label">Prive/Public</label>
                <div class="col-sm-10">
                    <Field name="status" type="checkbox" class="mb-3"  :model-value="status"/>
                    <ErrorMessage name="status" />
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary mb-3 px-4">Ajouter</button>
            </div>
        </div>
    </Form>
</template>

<script setup >
import { ref } from "vue"
import { RouterLink, RouterView } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useUserStore } from '@/stores/user.js'
let file = ref(null)
let status = ref("on")
const userStore = useUserStore()
const schema = yup.object({
    fileName: yup.mixed()
        .required('Vous devez sélectionner une image')
        .test('fileType', 'Le fichier doit être une image', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/png'].includes(value.type);
        }),
    status: yup.string(),
});

function onSubmit(values) {
    var form = new FormData()
    userStore.saveFile(values,form)

}

function fileInputChange(e) {
    file = e.target.files[0]
}   
</script>   

