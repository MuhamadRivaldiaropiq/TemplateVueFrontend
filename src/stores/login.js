import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useStorage } from '@vueuse/core'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const loginStore = defineStore({
  id: 'login',
  state: () => ({
    userData: useStorage('userData', []),
    authStatus: useStorage('authStatus', []),
  }),
  getters: {
    authUser: (state) => state.authStatus === 200 || state.authStatus === 204,
    hasUserData: (state) => Object.keys(state.userData).length < 0,
    hasVerified: (state) =>
      Object.keys(state.userData).length > 0 ? state.userData.email_verified_at !== null : false,
  },
  actions: {
    getData() {
      axios
        .get(`/api/user`)
        .then((response) => {
          this.userData = response.data
        })
        .catch((error) => {
          if (error.response.status !== 409) throw error

          this.router.push('/verify-email')
        })
    },
    async login(form) {
      console.log(form)

      await csrf()

      axios
        .post(`/login`, form)
        .then((response) => {
          this.authStatus = response.status
          console.log(response)

          //   processing.value = false
          this.getData()
          this.router.push({ name: 'home' })
        })
        .catch((error) => {
          console.log(error)

          // if (error.response.status !== 422) throw error

          //   setErrors.value = Object.values(error.response.data.errors).flat()
          //   processing.value = false
        })
    },
    async logout() {
      // const url = import.meta.env.VITE_PUBLIC_BACKEND_URL
      await axios
        .post(`/logout`)
        .then(() => {
          this.$reset()
          this.userData = {}
          this.authStatus = []

          this.router.push({ name: 'login' })
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error
        })
    },
  },
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(loginStore, import.meta.hot))
}
