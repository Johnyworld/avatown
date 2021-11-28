<script lang="ts">
  import { createPortal } from "./portal";
  import { Router, Route, Link } from 'svelte-routing'
  import HomeScreen from '~/routes/HomeScreen.svelte'
  import RoomsScreen from "./routes/RoomsScreen.svelte";
  import RoomScreen from "./routes/RoomScreen.svelte";
  import roomStore from "./store/roomStore";
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
    {#if !$roomStore.code}
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/room'>Rooms</Link>
      </nav>
      <Route path='/' component={HomeScreen} />
      <Route path='/room' component={RoomsScreen} /> 
    {:else}
      <Route path='/' component={RoomScreen} />
    {/if}
  </Router>
  <div use:createPortal={'modals'} class='modals' />
</div>
