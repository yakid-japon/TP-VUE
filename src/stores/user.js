import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import supabase from '../supabase'
import { useRouter } from 'vue-router'
import router from '../router';
const route = useRouter();
export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem("token") || null,
        user: null,
        errorMessage: null
    }),

    getters: {
        isAuthenticate: (state) => !!state.token
    },
    actions: {
        setToken(token) {
            this.token = token
            localStorage.setItem("token", token)
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem("token");
        },
        async login(values) {
            const { data: { user, session }, error } = await supabase.auth.signInWithPassword(values);

            if (error) {
                this.errorMessage = error.message
                throw new Error(error.message);

            }
            this.user = user;
            this.setToken(session.acces_token)
            this.errorMessage = null
            router.push("/")
        },

        async logout() {
            await supabase.auth.signOut();
            this.user = null;
            router.push("/login");
        },

        async register(values) {
            try {
                const { data: { user, session }, error } = await supabase.auth.signUp(values);

                if (error) {
                    console.error('Erreur lors de l\'inscription :', error.message);
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                } else {
                    console.log('Inscription réussie ! Utilisateur :', user);
                    router.push("/login")
                    this.setToken(session.acces_token)
                    this.errorMessage = null
                }
            } catch (error) {
                console.error('Erreur inattendue :', error.message);
            }
        },
        async saveFile(values, form) {
            const { data, error } = await supabase.storage.from("images_gallery").upload(`${this.user.id}/${values.fileName.name}`, values.fileName);
            if (error) {
                this.errorMessage = error.message
            }
            const op = await supabase
                .from('images')
                .insert([
                    { user_id: this.user.id, status: values.status == "on" ? true : false, img_url: data.path }
                ]);

            if (op.error) {
                this.errorMessage = op.error.message
                console.error(op.error);
            } else {
                router.push("/");
                console.log('Élément enregistré avec succès :', op.data);
            }
        },
        setUser(user) {
            this.user = user;
        }
    }
})
