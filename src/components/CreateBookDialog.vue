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
                                    <v-card outlined height="400px">
                                        <v-img v-if="url" :src="url" contain height="400px"></v-img>
                                        <v-img v-if="this.editBookObject && !url"
                                            v-bind:src="'data:image/jpeg;base64,'+this.editBookObject.image" contain
                                            height="400px"></v-img>
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
                                    <v-file-input v-if="this.mode == 0" :rules="fileRules" accept="image/*"
                                        truncate-length="15" v-on:change="chooseFile"></v-file-input>
                                    <!-- <v-file-input v-else :rules="fileEditRules" accept="image/*" truncate-length="15"
                                        v-on:change="chooseFile"></v-file-input> -->
                                    <v-card-actions class="dialog-button">
                                        <v-spacer></v-spacer>
                                        <v-btn color="depressed" @click="close">
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
            title: String,
            editBookObject: Object,
            mode: Number
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
                v => (v && v.length < 4) || 'Price must be less than 1000'],
                yearRules: [v => !!v || 'Year is required',
                v => /^\d+$/.test(v) || 'Year only accept numbers',
                v => /^(194[5-9]|19[5-9]\d|200\d|201[0-9])$/.test(v) || 'Year must be from 1945-2019'],
                fileRules: [v => !!v || 'File is required',
                v => /png|jpg|jpeg|gif|tif|tiff/i.test(v && v.name) || 'File must be image'],
                fileEditRules: [
                    v => /png|jpg|jpeg|gif|tif|tiff/i.test(v && v.name) || 'File must be image'],
                url: null,
                editObject: null,
                file: null

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
        watch: {
            editBookObject() {
                if (this.editBookObject) {
                    this.bookName = this.editBookObject.name;
                    this.publisher = this.editBookObject.publisher;
                    this.publishYear = this.editBookObject.publish_year;
                    this.price = this.editBookObject.price;
                }
            }
        },
        methods: {
            save: function () {
                if (this.mode == 0) {
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
                        this.resetForm();
                    });
                } else {
                    var bodyFormData = new FormData();
                    bodyFormData.append('id', this.editBookObject.id);
                    bodyFormData.append('name', this.bookName);
                    bodyFormData.append('publisher', this.publisher);
                    bodyFormData.append('price', this.price);
                    bodyFormData.append('publish_year', this.publishYear);
                    bodyFormData.append('image', this.imageFile);
                    this.show = false;
                    axios.put("http://localhost:8082/book", bodyFormData).then(response => {
                        axios.get("http://localhost:8082/book").then(response => {
                            this.$emit('eventname', response.data);
                        });
                        this.resetForm();
                    });
                }
            },
            chooseFile(e) {
                if (e) {
                    this.imageFile = e;
                    this.url = URL.createObjectURL(e);
                    console.log(e);
                } else {
                    this.url = null;
                }
            },
            resetForm() {
                // this.$refs.form.resetValidation();
                // if (this.mode == 0) {
                this.$refs.form.reset();
                this.url = null;
                // this.editBookObject = null;
                // } else {
                this.$refs.form.resetValidation();
                // }

                // this.editBookObject = null;
            },
            setEditForm() {
                if (this.editBookObject) {
                    this.bookName = this.editBookObject.name;
                    this.publisher = this.editBookObject.publisher;
                    this.publishYear = this.editBookObject.publish_year;
                    this.price = this.editBookObject.price;
                }

            },
            close() {
                this.resetForm();
                this.show = false;
            }

        }
    }
</script>
<style>
    .dialog-button {
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>