
<script lang="ts">
	import type { FilterType } from './../types/todos.ts';
     type  SetFilterType =   (newFilter: FilterType) => void 
    
    export let setFilter: SetFilterType
    export let selectedFilter: FilterType

    let filters = ['all','active','completed']


    function stringToFilterType(value: string): FilterType {
         return value as FilterType; 
    }
</script>

<div class="filters">
    {#each filters as filter}

<button 
      on:click={() => setFilter(stringToFilterType(filter))}
      class:selected={selectedFilter === filter}
      class="filter">{filter}
    </button>
    {/each}
</div>



<style>


    /* Filters */  
    .filters {
      display: flex;
      gap: var(--spacing-4);
    }
  
    .filter {
      text-transform: capitalize;
      padding: var(--spacing-4) var(--spacing-8);
      border: 1px solid transparent;
      border-radius: var(--radius-base);
    }
  
    .filter:hover {
      border: 1px solid var(--color-highlight);
    }
  
</style>