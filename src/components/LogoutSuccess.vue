<template>
    <div class="row">
        <div class="col">
            <h2>Logged Out successfully</h2>
            <v-btn depressed to="/login">
                <v-icon left dark>
                    mdi-login
                </v-icon>
                Login
            </v-btn>
        </div>
    </div>


</template>
<script>
    export default {
        mounted: function () {

        }
    }
</script>