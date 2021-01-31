<template>
    <v-container>
        <h3 class="text-left">Book List</h3>
        <v-row>
            <v-col>
                <v-btn class="float-right" color="" @click="onAddClick()">
                    Add new book
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="booklist" :items-per-page="15" class="elevation-1">
                    <template v-slot:item.action="props">
                        <v-btn class="mx-2" small color="" @click="onEditClick(props.item)">
                            <v-icon dark>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" small color="" @click="onDeleteClick(props.item)">
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <CreateBookDialog v-model="showScheduleForm" @eventname="updateparent""></CreateBookDialog>
    </v-container>


</template>

<script>
    import BookInfo from '../app/book-api';
    import CreateBookDialog from './CreateBookDialog'
    import axios from 'axios';
    export default {
        components: {
            CreateBookDialog
        },
        data: function () {
            return {
                showScheduleForm: false,
                booklist: [],
                headers: [{
                    text: 'Book name',
                    align: 'start',
                    sortable: true,
                    value: 'name',
                }, {
                    text: 'Publisher',
                    align: 'start',
                    sortable: true,
                    value: 'publisher',
                }, {
                    text: 'Price',
                    align: 'start',
                    sortable: true,
                    value: 'price',
                }, {
                    text: 'Publish Year',
                    align: 'start',
                    sortable: true,
                    value: 'publish_year',
                },
                    , {
                    text: 'Action',
                    value: 'action',
                }]

            }
        },
        mounted() {
            this.getAllBooks();
        },
        created() {

        },
        methods: {
            test: function (event) {
                axios.get(" http://localhost:8082/book").then(response => {
                    this.booklist = response.data;
                });
            },
            getAllBooks: function (event) {
                axios.get("http://localhost:8082/book").then(response => {
                    this.booklist = response.data;
                });
            },
            onDeleteClick(item) {
                axios.delete("http://localhost:8082/book/" + item.id).then(response => {
                    axios.get("http://localhost:8082/book").then(response => {
                        this.booklist = response.data;
                    });
                });
            },
            onEditClick(item) {
                console.log(item);
            },
            onAddClick() {
                this.showScheduleForm = true;
            },
            updateparent(result) {
                this.booklist = result;
            }
        }
    }
</script>

            <style>

            </style>