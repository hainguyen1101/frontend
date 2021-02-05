<template>
    <v-container>
        <v-row>
            <v-col>
                <h3 class="text-left">Book List</h3>
            </v-col>
        </v-row>
        <v-row>

            <v-col cols="4">
                <v-select class="text-left" v-model="select" :items="items" label="Search condition" dense outlined
                    v-on:change="changeSearchCondition">
                </v-select>
            </v-col>
            <v-col cols="4" v-if="select == 'Book name'">
                <v-text-field class="search-field" v-model="searchBookName" label="Book Name"></v-text-field>
            </v-col>
            <v-col cols="4" v-if="select == 'Publisher'">
                <v-text-field class="search-field" v-model="searchPublisher" label="Publisher"></v-text-field>
            </v-col>
            <v-col cols="2" v-if="select == 'Price'">
                <v-text-field width="60" class="search-field" v-model="searchPriceFrom" label="From"></v-text-field>

            </v-col>
            <v-col cols="2" v-if="select == 'Price'">
                <v-text-field width="60" class="search-field" v-model="searchPriceTo" label="To"></v-text-field>
            </v-col>
            <v-col cols="4" v-if="select == ''||!select == 'Book name'||!select == 'Publisher'||!select == 'Price'">

            </v-col>
            <v-col cols="4">

                <v-btn class="float-right" color="primary" @click="onSearchClick()">
                    Search
                </v-btn>
            </v-col>

        </v-row>
        <v-row>
            <v-col>
                <v-btn class="float-right" color="primary" @click="onAddClick()">
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
                    <template v-slot:item.image="props">
                        <div class="p-2">
                            <v-img v-bind:src="'data:image/jpeg;base64,'+props.item.image" max-width="100px"
                                max-height="100px"></v-img>
                        </div>

                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <CreateBookDialog ref="bookDialogComponent" v-model="showScheduleForm" @eventname="updateparent"
            :title="titleDialog" :editBookObject="editBookObject" :mode="mode"></CreateBookDialog>
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
                    text: 'Image',
                    value: 'image',
                    sortable: false,
                    width: "200px"
                }, {
                    text: 'Book name',
                    align: 'start',
                    sortable: true,
                    value: 'name',
                    width: "150px"
                }, {
                    text: 'Publisher',
                    align: 'start',
                    sortable: true,
                    value: 'publisher',
                    width: "150px"
                }, {
                    text: 'Price',
                    align: 'start',
                    sortable: true,
                    value: 'price',
                    width: "100px"
                }, {
                    text: 'Publish Year',
                    align: 'start',
                    sortable: true,
                    value: 'publish_year',
                    width: "200px"
                },
                {
                    text: 'Action',
                    value: 'action',
                    sortable: false,
                    width: "150px"
                }],
                titleDialog: "",
                editBookObject: null,
                mode: 0,
                items: ['', 'Book name', 'Publisher', 'Price', 'Publish Year'],
                select: '',
                searchBookName: '',
                searchPublisher: '',
                listCondition: [],
                searchPriceTo: '',
                searchPriceFrom: ''

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
                this.editBookObject = item;
                this.showScheduleForm = true;
                this.titleDialog = "Edit book";
                this.$refs.bookDialogComponent.setEditForm();
                this.mode = 1;
            },
            onAddClick() {
                this.showScheduleForm = true;
                this.titleDialog = "Create new book";
                this.editBookObject = null;
                // this.$refs.bookDialogComponent.resetForm();
                this.mode = 0;
            },
            updateparent(result) {
                this.booklist = result;
            },
            changeSearchCondition() {
                // alert(this.select);
            },
            onSearchClick() {
                let data = {
                    field: this.select,
                    name: ''
                }
                if (this.select == 'Book name') {
                    data.name = this.searchBookName
                }

                if (this.select == 'Publisher') {
                    data.name = this.searchPublisher
                }
                if (this.select == 'Price') {
                    data.from = this.searchPriceFrom
                    data.to = this.searchPriceTo
                }
                axios.post(" http://localhost:8082/book/search", data).then(response => {
                    this.booklist = response.data;
                });
            }
        }
    }
</script>

<style>
    div.search-field {
        margin-top: -7px;
    }
</style>