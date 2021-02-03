<template>
    <v-app>
        <!-- <fixed-header>
            <div class="navbar">
                <div>
                    <h2>Book management system</h2>
                </div>
                <v-btn depressed to="/logout">
                    <v-icon left dark>
                        mdi-logout
                    </v-icon>
                    Logout
                </v-btn>
            </div>

        </fixed-header> -->
        <v-app-bar class="" dense flat max-height="60px" height="60px">
            <div class="float-left">
                <h2>Book management system</h2>
            </div>
            <div class="right-postition">
                <v-btn icon to="/logout" class="link-custom">
                    <v-icon dark>
                        mdi-logout
                    </v-icon>
                </v-btn>
            </div>
        </v-app-bar>
        <v-main>
            <div class="row">
                <div class="col">
                    <!-- <h3>Welcome, </h3>
                    <div class="alert alert-info">
                        {{userInfo}}
                    </div> -->
                    <BookList></BookList>

                </div>
            </div>
        </v-main>
        <!-- <v-footer padless>
            <v-col class="text-right" cols="12"> Copyright
            </v-col>
        </v-footer> -->
        <v-footer class="footer-section">
            <div class="footer-copyright">
                <span>Copyright</span>
            </div>
        </v-footer>
    </v-app>

</template>

<script>
    import UserInfoStore from '../app/user-info-store';
    import UserInfoInfo from '../app/user-info-api';
    import BookList from './BookList.vue';
    import axios from 'axios';
    import FixedHeader from 'vue-fixed-header'
    export default {
        name: 'Home',
        components: {
            BookList,
            FixedHeader
        },
        data: function () {
            return {
                userPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
                userInfo: UserInfoStore.state.cognitoInfo
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style>
    .navbar.vue-fixed-header--isFixed {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
    }

    div .navbar {
        background-color: rgb(245, 245, 245);
    }

    a.link-custom {
        text-decoration: none;
    }

    .right-postition {
        position: absolute;
        right: 0px;
    }

    .footer-copyright {
        margin: 12px;
    }

    .footer-section {
        padding-left: 0;
        display: flex;
        justify-content: flex-end;
    }
</style>