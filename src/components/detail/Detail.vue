<template>

    <Card 
        class="CardDetalhes" 
        style="width: 25rem; margin-bottom: 2em"
        v-if="!caregando"> 

        <template #header>
            <img alt="user header" :src=imagemProduto height="300" width="300">            
        </template>        

        <template #title>
            Nome: {{ detalhesProduto.description_pro }} 
        </template>        

        <template #subtitle>
             Marca: {{ detalhesProduto.brand }} 
        </template>

        <template #content>
            <p>Descrição {{ detalhesProduto.description_pro }}</p> 
        </template>    

        <template #footer>
            <h3 style="margin-left: 250px"> 
                <strong>
                    {{ formatCurrency(preco) }} 
                </strong>
            </h3>
        </template>

    </Card>        
    <span v-else>

        <v-spacer class="AlturaSpacer">
            <ProgressSpinner class="CentralizarObjeto" strokeWidth="4" fill="#EEEEEE" animationDuration=".5s"/>
        </v-spacer>

    </span>
</template>

<script>

    import axios from 'axios';

    export default {

        props: ['id'],

        data() {

            return {

                detalhesProduto: [],
                imagemProduto: '',
                preco: 0,
                caregando: true

            }
        },

        methods: {
            formatCurrency(value) {
                return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            },
        },
    
        async mounted() {

            let body = JSON.stringify ({
                            "subdomain": "geisa",
                            "fk_id_product": this.id
                        })

            let headers = {
                    headers:
                    {
                        "x-server-origin" : "https://uslands.shop",
                        "Content-Type" : "application/json",
                        "Accept": "application/json",
                    }
                }

            await axios.post('https://apiprod.mais.com.br/api/ProductSale/FindDetailsProductStoreById/geisa', body, headers).then(res => {
                this.detalhesProduto = res.data
                this.imagemProduto = this.detalhesProduto.details[0].files[0]
                this.preco = this.detalhesProduto.details[0].price_sale_det
                this.caregando = false

                }).catch(error => {
                    // eslint-disable-next-line
                    console.log(error)
                })
        },

    }
</script>

<style>

</style>