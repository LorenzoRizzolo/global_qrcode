<script>
    import { Block,
        Button,
        Popup,
        Page,
        Navbar, 
        NavRight,
        Link, 
        Icon,
        ListInput,
        List,

        app

    } from "framework7-svelte";

    import { login } from "../js/api/login";
    import {logged} from "../js/store"
    import Registrati from "./registrati.svelte";

    let username, password

    // export let logged

    function accedi(){
        login(username, password).then(data=>{
            if(data.code==100){
              localStorage.setItem("token", data.token)
              localStorage.setItem("user", JSON.stringify(data.user))
              app.f7.popup.close()
              $logged=(data.code==100)
              // location.reload()
            }else if(data.code=="101"){
              app.f7.dialog.alert(data.details, "Login error")
            }else{
              app.f7.dialog.alert(data.details, "General error")
            }
        })
    }

</script>
<Block inset strong>
  <div class="login-box">
    <br><br>
    <div class="center"><h1><Icon material="account_circle"/>  Accedi alla piattaforma</h1></div>
    <List>
        <ListInput
            outline
            floatingLabel
            label="username"
            type="text"
            placeholder="Username"
            on:load:value={username}
            bind:value={username}
            clearButton
        />

        <ListInput
            outline
            floatingLabel
            label="Password"
            type="password"
            placeholder="Password"
            on:load:value={password}
            bind:value={password}
            clearButton
        />

        <Button on:click={accedi}>Accedi</Button>
        <p class="center">Non sei ancora registrato? <Registrati/></p>
        <p class="center">Non ti ricordi la password? </p>
    </List>
  </div>
</Block>

<style>
  .login-box{
    max-width: 600px;
    margin: auto;
  }
</style>