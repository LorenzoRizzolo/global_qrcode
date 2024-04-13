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

        app,

        f7


    } from "framework7-svelte";

    import { login, signin } from "../js/api/login";
    import {logged, user_data} from "../js/store"

    let data_user = {
        username:"", 
        password:"",
        name:"", 
        email:""
    }

    // export let logged

    function registrati(){
        if(data_user.username && data_user.password && data_user.name && data_user.email){
            signin(data_user.username, data_user.password, data_user.name, data_user.email).then(data=>{
                // console.log(data)
                if(data.code==100){
                    localStorage.setItem("user", JSON.stringify(data.user))
                    localStorage.setItem("token", data.token)
                    $user_data = data.user
                    // console.log($user_data)
                    $logged=true
                    app.f7.popup.close()
                }else if(data.code=="101"){
                    app.f7.dialog.alert(data.details, "Errore")
                }else{
                    app.f7.dialog.alert(data.details, "Errore generale")
                }
            })
        }else{
            f7.dialog.alert("Compila tutti i campi")
        }
    }

</script>

<Link popupOpen=".register-popup">Registrati</Link>


<Popup push class="register-popup">
    <Page>
      <Navbar title={"Registrati"} large transparent>
        <NavRight>
          <Link popupClose><Icon material="close" color="red" /></Link>
        </NavRight>
      </Navbar>
      <Block>
        <br><br>
        <Icon material="account_circle"/>  Registrati sulla piattaforma
        <List>
            <ListInput
                outline
                floatingLabel
                label="username"
                type="text"
                placeholder="Username"
                on:load:value={data_user.username}
                bind:value={data_user.username}
                clearButton
            />

            <ListInput
                outline
                floatingLabel
                label="Password"
                type="password"
                placeholder="Password"
                on:load:value={data_user.password}
                bind:value={data_user.password}
                clearButton
            />

            <ListInput
                outline
                floatingLabel
                label="Nome Cognome"
                type="text"
                placeholder="Nome Cognome"
                on:load:value={data_user.name}
                bind:value={data_user.name}
                clearButton
            />

            <ListInput
                outline
                floatingLabel
                label="Email"
                type="email"
                placeholder="Email"
                on:load:value={data_user.email}
                bind:value={data_user.email}
                clearButton
            />

            <Button on:click={registrati}>Registrati</Button>
        </List>
      </Block>
    </Page>
  </Popup>