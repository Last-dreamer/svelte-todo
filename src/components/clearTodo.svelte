
<script lang="ts">
    
    type ClearAllTodoType = () => void

    export let clearAllTodo: ClearAllTodoType
    export let completedTodo: number

</script>



<button 
on:click={ ()=> clearAllTodo()}
class:hidden={completedTodo === 0} 
class="clear-completed">Clear completed</button>


