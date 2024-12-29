import axios from '@/lib/axios'
import { defineStore } from 'pinia'

export const projectStore = defineStore({
  id: 'project',
  state: () => ({
    project: [],
  }),
  getters: {
    allProject: (state) => state.project,
  },
  actions: {
    async getProject() {
      try {
        const response = await axios.get(`/api/project`)
        this.project = response.data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
