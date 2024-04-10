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
        List
    } from "framework7-svelte";

    import { login } from "../js/api/login";

    let username, password

    function accedi(){
        login(username, password)
    }

</script>
<Block strong inset style="margin-bottom:0;">
    <div class="center">Accedi alla piattaforma prima di continuare <Button popupOpen=".login-popup">Accedi</Button> </div>
</Block>


<Popup push class="login-popup">
    <Page>
      <Navbar title={"Login"} large transparent>
        <NavRight>
          <Link popupClose><Icon material="close" color="red" /></Link>
        </NavRight>
      </Navbar>
      <Block>
        <br><br>
        <Icon material="account_circle"/>  Accedi alla piattaforma
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
        </List>
      </Block>
    </Page>
  </Popup>