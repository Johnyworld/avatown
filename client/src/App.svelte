<script lang="ts">
  import { createPortal } from "./portal";
  import { Router, Route } from 'svelte-routing'
  import HomeScreen from '~/routes/HomeScreen.svelte'
  import RoomsScreen from "./routes/RoomsScreen.svelte";
  import RoomScreen from "./routes/RoomScreen.svelte";
</script>

<style lang="scss">
  @import './style';
  .modals {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>

<div class='root'>
  <Router url=''>
    <Route path='/' component={HomeScreen} />
    <Route path='/room' component={RoomsScreen} /> 
    <Route path='/room/:id' component={RoomScreen} /> 
  </Router>
  
  <div use:createPortal={'modals'} class='modals' />
</div>
