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
        errorMessage:null
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
            const { user, session, error } = await supabase.auth.signInWithPassword(values);
            if (error) {
                this.errorMessage=error.message
                throw new Error(error.message);
                
            }
            this.user = user;
            this.setToken(session.acces_token)
            this.errorMessage=null
            router.push("/home")
        },

        async logout() {
            await supabase.auth.signOut();
            this.user = null;
        },

        async register(values) {
            try {
                const { user, session, error } = await supabase.auth.signUp(values);

                if (error) {
                    console.error('Erreur lors de l\'inscription :', error.message);
                    this.errorMessage=error.message
                    console.log(this.errorMessage)
                } else {
                    console.log('Inscription réussie ! Utilisateur :', user);
                    router.push("/login")
                    this.setToken(session.acces_token)
                    this.errorMessage=null
                }
            } catch (error) {
                console.error('Erreur inattendue :', error.message);
            }
        },


    }
})
