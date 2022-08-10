<template>
  <div id="todo-item">
    <div class="task">
        <div class="checkbox">
            <input type="checkbox" :id="'task'+ index" :checked="task.isCompleted" @change="updateTaskStatus($event)" >
            <span class="custom-checkbox"></span>
        </div>
        <label :for="'task'+ index">{{ task.task }}</label>
    </div>
    <div class="actions">
        <ToDoActions :image="'edit.png'" @click="editClicked" />
        <ToDoActions :image="'trash-can.png'" @click="deleteTask" />
    </div>
  </div>
</template>

<script>
import ToDoActions from './ToDoActions.vue';
import { useStore } from 'vuex';
export default {
    components: { ToDoActions },
    props:{
        task:{
            type:Object
        },
        index:{
            type:Number
        },
        editMode:{
            type:Boolean
        }
    },
    emits:['editClicked'],
    setup(props, ctx){
        const store = useStore();

        const deleteTask = ()=>{
            if(props.editMode) return
            store.commit('deleteTask', props.index)
        }

        const updateTaskStatus = (e)=>{
            const data = {
                index : props.index,
                status : e.target.checked
            }
            store.commit('updateTaskStatus', data)
        }

        const editClicked = ()=>{
            ctx.emit('editClicked', props.index)
        }

        return{
            deleteTask,
            updateTaskStatus,
            editClicked,
        }
    }
}
</script>

<style scoped>
    #todo-item{
        background: #000;
        color:#fff;
        display: flex;
        justify-content: space-between;
        padding:1.1rem 1rem;
        align-items:center;
        background:rgba(255,255,255,0.1);
        margin-bottom: 1rem;
    }

    /*#todo-item.prevent{
        pointer-events: none;
    }*/
    .task{
        display:flex;
        gap:1rem;
    }
    .checkbox{
        position: relative;
    }
    .checkbox input{
        margin-right:10px;
        opacity: 0;
        cursor: pointer;
        z-index: 1000;
    }
    .custom-checkbox{
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: transparent;
        border: 2px solid #fff;
        border-radius:2px;
        pointer-events: none;
    }
    
    .checkbox input:checked + .custom-checkbox{
        background-image: url("../assets/check.png");
        background-position: center;
        background-size: 10px;
        background-repeat: no-repeat;
    }
    .actions{
        display:flex;
        gap:1rem;
    }
</style>