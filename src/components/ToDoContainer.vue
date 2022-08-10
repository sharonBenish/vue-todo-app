<template>
  <div class="container">
    <h1>Todo List</h1>
    <form class="todoInput" @submit.prevent="addTodo">
        <p>Add to the todo list</p>
        <input ref="inputField" type="text" class="input-field" v-model="todoInput">
        <button v-if="editMode" type="submit">EDIT ITEM</button>
        <button v-else type="submit">ADD ITEM</button>
    </form>
    <ToDoItem v-for="(task, index) in todos" :key="index" :task=task :index=index @editClicked="editTask" :editMode=editMode />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ToDoItem from './ToDoItem.vue';
export default {
    components: { ToDoItem },
    setup(){
        const store = useStore();
        const editMode =ref(false);
        const editTaskIndex = ref(null);
        const inputField = ref(null);
        const todoInput = ref("");
        
        onMounted(()=>{
            inputField.value.focus()
        })

        const todos= computed(() => store.state.todos);
        const addTodo = ()=>{
            if(editMode.value){
                store.commit('editTodo', {
                    task: todoInput.value,
                    index: editTaskIndex.value
                })
                editMode.value = false;
            } else{
                store.commit('addTodo', {
                    task: todoInput.value,
                    isCompleted: false
                });
            }
            todoInput.value=""
        }

        const editTask= (index)=>{
            if (todos.value[index].isCompleted || editMode.value)return
            editMode.value = true;
            editTaskIndex.value = index;
            todoInput.value=todos.value[index].task;
            inputField.value.focus()
        }

        return{
            todoInput,
            inputField,
            todos,
            editMode,
            addTodo,
            editTask
        }
    }
}
</script>

<style scoped>
.container{
    max-width:800px;
    margin: 0 auto;
}
h1{
    font-size:2.6rem;
    letter-spacing:0.05em;
    border-bottom:1px solid rgba(255,255,255,.3);
    font-weight: normal;
}

.todoInput{
    display:flex;
    flex-wrap: wrap;
    margin:1rem 0;
    gap:5px;
}

.todoInput >p{
    width:100%;
    margin-bottom: 0.6rem;
}

.todoInput > input{
    border:none;
    padding:0 1.5em;
    outline: none;
    flex-grow: 1;
}

button{
    border:1px solid #fff;
    background: transparent;
    color:#fff;
    padding:0 1.3rem;
}

.todoInput > input, .todoInput >button{
    height: 3rem;
}
</style>