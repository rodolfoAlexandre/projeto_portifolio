<template>

    <span>

        <DataTable v-if="!caregando"
            :value="produtos" 
            :selection.sync="idProdutoSelecionado" 
            selectionMode="single" 
            dataKey="id"
            :paginator="true" 
            :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords}">

            <template #header>
                <h2>
                    <strong>Produtos</strong>
                </h2>
            </template>

            <Column field="id" header="Código" sortable width="300"></Column>
            <Column field="name_pro" header="Nome" sortable></Column>
            <Column field="price_sale_det" header="Preço" sortable>
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.price_sale_det)}}
                </template>        
            </Column>
            <Column field="name_category" header="Categoria" sortable></Column>
            <Column field="created_at" header="Data Criação" sortable>
                <template #body="slotProps">
                    {{formatDate(slotProps.data.created_at)}}
                </template>         
            </Column>

            <Column header="Detalhes" >
                <template #body="slotProps">
                    <Button icon="pi pi-search" class="p-button-rounded p-button-success p-mr-4" 
                        @click="detail(slotProps.data.id)" />
                </template>
            </Column>    

        </DataTable>
        <span v-else>

            <v-spacer class="AlturaSpacer">
                <ProgressSpinner class="CentralizarObjeto" strokeWidth="4" fill="#EEEEEE" animationDuration=".5s"/>
            </v-spacer>

        </span>
    </span>

</template>

<script>

    import moment from 'moment';
    import axios from 'axios';

    export default {

        data(){
            return {
                produtos:[],
                idProdutoSelecionado : null,
                caregando: true
            }		
        },

        created() {

            let body = JSON.stringify ({
                            search_name: "",
                            page: {
                                limit: 90000,
                                page: 1
                            }
                        })

            let headers = {
                    headers:
                    {
                        "x-server-origin" : "https://uslands.shop",
                        "Content-Type" : "application/json",
                        "Accept": "application/json",
                    }
                }

            axios.post('https://apiprod.mais.com.br/api/ProductSale/FindAllProductsByStore/geisa', body, headers).then(res => {
                this.produtos = res.data
                this.caregando = false
                }).catch(error => {
                    // eslint-disable-next-line
                    console.log(error)
                })
        },

        methods: {
            detail(id) {
                this.$router.push({ path : '/detail/' + id})
            },

            formatCurrency(value) {
                return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            },

            formatDate(value) {

                let data = value
                return moment(data).format('DD/MM/ YYYY h:mm:ss')
            }

        }

    }

</script>

<style>

</style>