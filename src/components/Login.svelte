<script lang='ts'>
    import { currentUser, pb } from "./pocketbase";
    import { Button, Alert } from 'flowbite-svelte';

    import Graph from "./Graph.svelte";
    import Dashboard from "./Dashboard.svelte";


    let username: string;
    let password: string;
  
    async function login() {
      await pb.collection("users").authWithPassword(username, password);
      console.log(user);
    }
  
    async function singUp(){
      try {
        const data = {
          username,
          password,
          passwordConfirm: password,
          name: 'Henlo!',
        };
        await pb.collection("users").create(data);
        await login();
      } catch (err) {
        console.log(err);
      }
    }
  
    function singOut(){
      pb.authStore.clear();
    }


  </script>



<div class="
m-5
md:mt-20
p-8 
flex
h-80vh 
w-80vw
justify-center 
overflow-hidden
drop-shadow-2xl
bg-blue-100 
dark:bg-gray-600
rounded-lg"
>
  <!-- {#if $currentUser}
    {#if $currentUser.verified} -->
    <div>
      <Dashboard />
    </div>



    <!-- {:else}
    <div class="h-screen" >
    <div class="h-64 w-200 rounded-lg bg-gray-200 p-5 flex items-center dark:bg-gray-600">
         <Alert color="red" class="text-xl">
          <span class="text-xl font-bold">Witaj, {$currentUser.username}!<br></span>
          Twoje konto czeka na zatwierdzenie przez administratora.
        </Alert>
      </div>
    </div>
    {/if}
  {:else}
  <div 
  class="flex-col justify-center">
    <div class="p-8 flex justify-center overflow-hidden">
      <p class="text-2xl dark:text-white">Wpisz login i hasło, aby się zalogować.</p>
    </div>
  <div class="grid justify-around">
    <form on:submit|preventDefault>
      <input 
        placeholder="login"
        type="text"
        bind:value={username}
    />
      <input 
        placeholder="hasło"
        type="password"
        bind:value={password}
    />

      <div class="flex justify-end mt-4">
        <Button color="light" class="m-2" on:click={login}>Zaloguj</Button>
        <Button color="dark" class="m-2" on:click={singUp}>Zarejestruj</Button>
      </div>


      <Alert color="blue" class="text-xl">
        <span class="text-xl">Uwaga!</span>
        Zaczekaj na zatwierdzenie jeśli utworzyłeś konto.
      </Alert>

    </form>
  </div>
</div>
  {/if} -->
</div>  
