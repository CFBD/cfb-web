<template>
    <div class="page-container container">
        <b-card class='title-card shadow-lg'>
            <b-row class='justify-content-between'>
                <b-col>
                    <h1>College Football Data API Keys</h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <p class='text-muted'>Submit your email below to receive your free API key</p>
                </b-col>
            </b-row>
            <hr />
            <b-form @submit="onSubmit" v-if="showForm">
                <b-row>
                    <b-col />
                    <b-col>
                        <b-form-group id="email-input-group" label="Email address:" label-for="email-input"
                            description="Your free API key will be sent to this address">
                            <b-form-input id="input-email" v-model="email" type="email" placeholder="Enter email"
                                required>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col />
                </b-row>
                <b-row>
                    <b-col />
                    <b-col>
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-col>
                </b-row>
            </b-form>
            <b-spinner variant="primary" label="Generating" v-if="showSpinner"></b-spinner>
            <b-row v-if="showMessage">
                <b-col />
                <b-col class='lead' sm='6'>
                    Your API key request has been submitted and will be sent to the specified email.
                </b-col>
                <b-col />
            </b-row>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "keyPage",
        data() {
            return {
                showForm: true,
                showSpinner: false,
                showMessage: false,
                email: ''
            };
        },
        methods: {
            onSubmit() {
                this.showForm = false;
                this.showSpinner = true;

                this.$axios.post('/auth/key', {
                    email: this.email
                }).catch(err => {
                    console.error(err);
                }).finally(() => {
                    this.showSpinner = false;
                    this.showMessage = true;
                });
            }
        }
    }

</script>

<style>

</style>
