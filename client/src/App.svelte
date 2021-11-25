<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing'
  import HomeScreen from '~/routes/HomeScreen.svelte'
  import AboutScreen from '~/routes/AboutScreen.svelte'
</script>

<style lang="scss">
  @import './style';
</style>

<Router url=''>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
  </nav>
  <Route path="/">
    <HomeScreen />
  </Route>
  <Route path="/about" component={AboutScreen} /> 
</Router>
