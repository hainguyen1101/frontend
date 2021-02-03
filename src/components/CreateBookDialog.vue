<template>
    <v-row justify="center">
        <v-dialog v-model="show" persistent max-width="900px">
            <template v-slot:activator="{ on, attrs }">
            </template>
            <v-card>
                <v-card-title>{{title}}</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form" v-model="valid">
                            <v-row>
                                <v-col cols="6">
                                    <v-card outlined height="500px">
                                        <v-img v-if="url" :src="url" contain height="500px"></v-img>
                                    </v-card>
                                </v-col>
                                <v-col cols="6">

                                        <v-text-field :rules="nameRules" v-model="bookName" label="Book Name*" required>
                                        </v-text-field>
                                        <v-text-field :rules="publisherRules" v-model="publisher" label="Publisher*"
                                            required></v-text-field>
                                        <v-text-field :rules="priceRules" v-model="price" label="Price*" required>
                                        </v-text-field>
                                        <v-text-field :rules="yearRules" v-model="publishYear" label="Publish Year*"
                                            required></v-text-field>
                                        <v-file-input :rules="fileRules" accept="image/*" truncate-length="15"
                                            v-on:change="chooseFile"></v-file-input>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="depressed" @click="show=false">
                                                Close
                                            </v-btn>
                                            <v-btn :disabled="!valid" depressed color="primary" @click="save">
                                                Save
                                            </v-btn>
                                        </v-card-actions>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                    <!-- <small>*indicates required field</small> -->
                </v-card-text>

            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import axios from 'axios';
    export default {
        props: {
            value: Boolean,
            bookList: Object,
            title: String
        },
        data: function () {
            return {
                bookName: '',
                publisher: '',
                price: '',
                publishYear: '',
                imageFile: null,
                valid: false,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 64) || 'Name must be less than 64 characters',
                ],
                publisherRules: [
                    v => !!v || 'Publisher is required',
                    v => (v && v.length <= 64) || 'Publisher must be less than 64 characters',
                ],
                priceRules: [v => !!v || 'Price is required',
                v => /^\d+$/.test(v) || 'Price only accept numbers',
                v => (v.length < 4) || 'Price must be less than 1000'],
                yearRules: [v => !!v || 'Year is required',
                v => /^\d+$/.test(v) || 'Year only accept numbers',
                v => /^(194[5-9]|19[5-9]\d|200\d|201[0-9])$/.test(v) || 'Year must be from 1945-2019'],
                fileRules: [v => !!v || 'File is required',
                v => /png|jpg|jpeg|gif|tif|tiff/i.test(v && v.name) || 'File must be image'],
                url: null

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
        created() {
        },
        methods: {

            save: function () {
                var bodyFormData = new FormData();
                bodyFormData.append('name', this.bookName);
                bodyFormData.append('publisher', this.publisher);
                bodyFormData.append('price', this.price);
                bodyFormData.append('publish_year', this.publishYear);
                bodyFormData.append('image', this.imageFile);
                // let data = {
                //     name: this.bookName,
                //     publisher: this.publisher,
                //     price: this.price,
                //     publish_year: this.publishYear,
                //     image: 
                // }
                this.show = false;
                axios.post("http://localhost:8082/book", bodyFormData).then(response => {
                    axios.get("http://localhost:8082/book").then(response => {
                        this.$emit('eventname', response.data);
                    });

                });
            },
            chooseFile(e) {
                if (e) {
                    this.imageFile = e;
                    this.url = URL.createObjectURL(e);
                    console.log(e);
                } else {
                    this.url = null;
                }

            }
        }
    }
</script>