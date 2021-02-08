<template>
    <div id="app">
        <v-app-bar dense>

            <v-toolbar-title class="mr-4">
                <h2>
                    <span>
                        Projeto Protifólio
                    </span>
                </h2>            
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text to="/" class="botao-header">
                <v-icon>home</v-icon>
                <span>Início</span>                
            </v-btn>

            <v-btn text to="/list" class="botao-header">
                <v-icon>list</v-icon>
                <span>Listagem</span>                
            </v-btn>
        
        </v-app-bar>
    </div>
</template>

<script>

export default {

}
</script>

<style>

</style>