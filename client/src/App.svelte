<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import HomeScreen from '~/routes/HomeScreen.svelte';
  import AboutScreen from '~/routes/AboutScreen.svelte';
  import {onMount} from 'svelte'

  let count: number = 0
  onMount(() => {
    const interval = setInterval(() => count++, 1000)
    return () => {
      clearInterval(interval)
    }
  })
</script>

<style lang="scss">
  @import './style';
</style>

<Router url=''>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
  </nav>
  <Route path="/" component={HomeScreen} />
  <Route path="/about" component={AboutScreen} /> 
</Router>
