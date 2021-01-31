<template>
    <v-row justify="center">
        <v-dialog v-model="show" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
            </template>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="bookName" label="Book Name*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="publisher" label="Publisher*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="price" label="Price*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="publishYear" label="Publish Year*" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="depressed" @click="show=false">
                        Close
                    </v-btn>
                    <v-btn depressed
                    color="primary" @click="save">
                    Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import axios from 'axios';
    export default {
        props: {
            value: Boolean,
            bookList: Object
            
        },
        data: function () {
            return {
                bookName: '',
                publisher: '',
                price: '',
                publishYear: ''
            }
        },
        computed: {
            show: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            }
        },
        methods: {

            save: function () {
                let data = {
                    name: this.bookName,
                    publisher: this.publisher,
                    price: this.price,
                    publish_year: this.publishYear
                }
                this.show = false;
                axios.post("http://localhost:8082/book", data).then(response => {
                    axios.get("http://localhost:8082/book").then(response => {
                        this.$emit('eventname', response.data);
                    });
                   
                });
            }
        }
    }
</script>