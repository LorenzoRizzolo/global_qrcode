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

    let user_data = {
        username:"", 
        password:"",
        name:"", 
        email:""
    }

    // export let logged

    function registrati(){
        // console.log(user_data)
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
                on:load:value={user_data.username}
                bind:value={user_data.username}
                clearButton
            />

            <ListInput
                outline
                floatingLabel
                label="Password"
                type="password"
                placeholder="Password"
                on:load:value={user_data.password}
                bind:value={user_data.password}
                clearButton
            />

            <ListInput
                outline
                floatingLabel
                label="Nome Cognome"
                type="text"
                placeholder="Nome Cognome"
                on:load:value={user_data.name}
                bind:value={user_data.name}
                clearButton
            />

            <ListInput
                outline
                floatingLabel
                label="Email"
                type="email"
                placeholder="Email"
                on:load:value={user_data.email}
                bind:value={user_data.email}
                clearButton
            />

            <Button on:click={registrati}>Registrati</Button>
        </List>
      </Block>
    </Page>
  </Popup>