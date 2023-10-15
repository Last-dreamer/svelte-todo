// import {writable} from 'svelte/store'
// import type  {Writable} from 'svelte/store'

// // import { writable, type Writable } from "svelte/store"


//  export function useStorage<Value>(key: string, initialValue: Value): Writable<Value> {
    
//     let serialize = JSON.stringify
//     let deserialize = JSON.parse

//     let storedValue = deserialize(localStorage.getItem(key) ?? "")
//     let store = writable(storedValue ? storedValue: initialValue)
//     store.subscribe((value)=> localStorage.setItem(key, serialize(value)))

//     return store
// }

import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export function useStorage<Value>(
  key: string,
  initialValue: Value
): Writable<Value> {
  let serialize = JSON.stringify
//   let deserialize = JSON.parse


  let storedData = localStorage.getItem(key)
  let todos: Value;

  if(storedData != null){
    try {
        todos = JSON.parse(storedData);

        let store = writable(todos ? todos : initialValue)
        store.subscribe((value) => localStorage.setItem(key, serialize(value)))
        return store
    } catch (error) {
        console.error('Error parsing JSON:', error);
    } 
  }

  return writable(initialValue); 
}
