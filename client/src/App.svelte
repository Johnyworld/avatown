<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import HomeScreen from '~/routes/HomeScreen.svelte';
  import AboutScreen from '~/routes/AboutScreen.svelte';
  import {onMount} from 'svelte'
  import {HE} from '~/test'

  let count: number = 0
  onMount(() => {
    const interval = setInterval(() => count++, 1000)
    return () => {
      clearInterval(interval)
    }
  })
</script>

<style lang="scss">
  @import './App';
</style>

<Router url=''>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
  </nav>
  <Route path="/" component={HomeScreen} />
  <Route path="/about" component={AboutScreen} /> 
  <div class="App Appp">
    <header class="App-header">
      <img src="/logo.svg" class="App-logo" alt="logo"/>
      <p>Edit <code>src/App.svelte</code> and save to reload.</p>
      <p>Page has been open for <code>{count}</code> seconds.</p>
      <p>
        <a class="App-link" href="https://svelte.dev" target="_blank" rel="noopener noreferrer">
          Learn Svelte
          {HE}
        </a>
      </p>
    </header>
  </div>

</Router>
