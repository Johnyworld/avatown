<script lang="ts">
  import { createPortal } from "./portal";
  import { Router, Route } from 'svelte-routing'
  import HomeScreen from '~/routes/HomeScreen.svelte'
  import RoomsScreen from "./routes/RoomsScreen.svelte";
  import RoomScreen from "./routes/RoomScreen.svelte";
  import LoginScreen from "./routes/LoginScreen.svelte";
  import userStore from "./store/userStore";
  import SettingsScreen from "./routes/SettingsScreen.svelte";
  import AccountScreen from "./routes/AccountScreen.svelte";
  import AvatarScreen from "./routes/AvatarScreen.svelte";
  import FindPasswordScreen from "./routes/FindPasswordScreen.svelte";
  import NewPasswordScreen from "./routes/NewPasswordScreen.svelte";
  import GuestScreen from "./routes/GuestScreen.svelte";
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
  {#if $userStore.userInfo}
    <p>로그인 된 유저: {$userStore.userInfo.name}</p>
  {/if}
  <Router>
    {#if $userStore.userInfo}

      <Route path='/' component={HomeScreen} />
      <Route path='/rooms' component={RoomsScreen} /> 
      <Route path='/settings' component={SettingsScreen} /> 
      <Route path='/account' component={AccountScreen} /> 
      <Route path='/avatar' component={AvatarScreen} /> 
      <Route path='/w/:id' component={RoomScreen} />

    {:else}

      <Route path='/' component={GuestScreen} />
      <Route path='/rooms' component={RoomsScreen} /> 
      <Route path='/login' component={LoginScreen} /> 
      <Route path='/findpw' component={FindPasswordScreen} /> 
      <Route path='/newpw' component={NewPasswordScreen} /> 
      <Route path='/w/:id' component={RoomScreen} />

    {/if}
  </Router>
  <div use:createPortal={'modals'} class='modals' />
</div>
