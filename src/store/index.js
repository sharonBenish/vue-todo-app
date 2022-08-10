import { createStore } from 'vuex'

export default createStore({
  state: {
    todos:[]
  },
  getters: {
  },
  mutations: {
    addTodo(state, payload){
      state.todos.push(payload)
    },
    deleteTask(state, payload){
      state.todos.splice(payload, 1)
    },
    updateTaskStatus(state, payload){
      const status = payload.status
      const index = payload.index
      state.todos[index].isCompleted = status;

    },
    editTodo(state, payload){
      const index = payload.index
      const task = payload.task
      state.todos[index].task = task;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
