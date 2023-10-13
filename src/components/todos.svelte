<script lang="ts">
 
import type {FilterType, ITodo } from "$root/types/todos"
import {useStorage} from '$root/store/useStorage'
    import AddTodo from "./addTodo.svelte";
    import TodoItem from "./todoItem.svelte";
    import LeftTodo from "./leftTodo.svelte"
    import FilteredTodos from "./filteredTodos.svelte";
    import ClearTodo from "./clearTodo.svelte";

    // const storedData = localStorage.getItem('todos');  

 
    let todos = useStorage<ITodo[]>('todos', [])


    let selectedFilter: FilterType  = 'all'


    let retrivedTodos = $todos
   
    
    // debug
    $: console.log($todos)

    // amount
    $: todoAmount = retrivedTodos.length

    
    // left amount 
    $: incompleteTodos = retrivedTodos.filter(todo =>  !todo.completed).length

    // filtered todos
    $: filteredTodos = filterTodos($todos, selectedFilter)
    $: completedTodo =  retrivedTodos.filter(todo => todo.completed).length


    
    //methods
    function generateRandomId(): string {
        return Math.random().toString(16).slice(2)
    }

    // addtodo
    function addTodo(todo: string) {
        let newTodo: ITodo = {
            id: generateRandomId(),
            text: todo,
            completed: false
        }
        $todos = [...$todos, newTodo]
    }

    // toggle completed
    function toggleCompleted(event: MouseEvent) {
        let { checked } = event.target as HTMLInputElement
        $todos = $todos.map(todo => ({
            ...todo,
            completed: checked
        }))
    }


    // complete method
    function completeTodo(id: string): void {
      $todos = $todos.map((todo) => {
        if(todo.id === id){
            todo.completed = !todo.completed
        }   
        return todo
      })
    }

    // remove 
    function removeTodo(id: string):void {
        $todos = $todos.filter((todo)=> todo.id !== id)
    }

    function setFilter(newFilter: FilterType):void {
        selectedFilter = newFilter
    }

    function filterTodos(todo: ITodo[], filter: FilterType): ITodo[] {
      let allTodo = $todos

      if(allTodo){
        switch (filter) {
            case "all": return allTodo;
            case "active": return allTodo.filter(todo => !todo.completed)
            case "completed": return allTodo.filter(todo => todo.completed)
        }
      }else{
        return []
      }      
    }

    function clearAllTodo():void {
       $todos =  $todos.filter(todo => todo.completed !== true)
    }

</script>

<main>
    <h1 class="title">Todos</h1>
  
    <section class="todos">
    
        <AddTodo {addTodo} {toggleCompleted} {todoAmount} />

     {#if todoAmount}
      <ul class="todo-list">
        {#each filteredTodos as todo (todo.id)}
        <TodoItem {todo}  {completeTodo} {removeTodo}/>
        {/each}
      </ul>
  
      <div class="actions">
        <LeftTodo {incompleteTodos}/>
       <FilteredTodos  {selectedFilter} {setFilter} />
       <ClearTodo {clearAllTodo}  {completedTodo}/>
     
      </div>
      {/if}
    </section>
  </main>


  <style>
   
   /* .editing .todo-item {
      display: none;
    }
  
    .edit {
      width: 100%;
      padding: var(--spacing-8);
      font-size: var(--font-24);
      border: 1px solid #999;
      border-radius: var(--radius-base);
      box-shadow: inset 0 -1px 5px 0 var(--shadow-1);
    } */
  
   .title {
      font-size: var(--font-80);
      font-weight: inherit;
      text-align: center;
      color: var(--color-title);
    }
  
    .todos {
      --width: 500px;
      --todos-bg: hsl(0 0% 98%);
      --todos-text: hsl(220 20% 14%);
  
      width: var(--width);
      color: var(--todos-text);
      background-color: var(--todos-bg);
      border-radius: var(--radius-base);
      border: 1px solid var(--color-gray-90);
      box-shadow: 0 0 4px var(--shadow-1);
    }
  
    .todo-list {
      list-style: none;
    }
  
    .actions {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-8) var(--spacing-16);
      font-size: 0.9rem;
      border-top: 1px solid var(--color-gray-90);
    }
  
    .actions:before {
      content: '';
      height: 40px;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.2), 0 8px 0 -3px hsl(0, 0%, 96%),
        0 9px 1px -3px hsla(0, 0%, 0%, 0.2), 0 16px 0 -6px hsl(0, 0%, 96%),
        0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
      z-index: -1;
    }
  
  </style>
  