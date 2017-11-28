<template>
    <v-container class="pa-0">
        <v-container>
            <template>
                <v-layout row>
                    <v-flex>
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title> XML Parser </v-toolbar-title>
                            </v-toolbar>
                            <v-container fluid>
                                <v-card-text>
                                    <h5>Please upload a c/c++ file that has been converted to a xml document.</h5>
                                    <!-- This form will upload file to the bucket -->

                                    <form action="http://vulno-xml-files.s3.amazonaws.com/" method="post" enctype="multipart/form-data">
                                        <input type="hidden" name="acl" value="public-read" />
                                        <input type="hidden" name="key" value="${filename}" />
                                        <input type="hidden"  name="Content-Type" value="application/json" />
                                        <input type="file"   name="file" id="file" />
                                        <label id="lbl"></label>

                                        <v-btn type="submit" class="green lighten-1 white--text"> Upload to Amazon S3</v-btn>
                                        <v-btn @click="load()" class="green lighten-1 white--text">Get Info from AWS</v-btn>

                                    </form>

                                    <v-dialog v-model="graphDialog" lazy absolute max-width="45%">
                                        <v-card>
                                            <v-container fluid>
                                                <v-card-text>

                                                    <!-- Begin Input Row -->
                                                    <v-form ref="form">
                                                        <div>
                                                            <bar-chart :files="files" :safeunsafe="safe"></bar-chart>
                                                            <bar-chart :files="files" :safeunsafe="unsafe"></bar-chart>
                                                        </div>

                                                        <v-btn @click="graphDialog = false" class="red white--text">Close</v-btn>
                                                    </v-form>
                                                </v-card-text>
                                            </v-container>
                                        </v-card>
                                    </v-dialog>

                                    <v-dialog v-model="bubbleGraphDialog" lazy absolute max-width="45%">
                                        <v-card>
                                            <v-container fluid>
                                                <v-card-text>

                                                    <!-- Begin Input Row -->
                                                    <v-form ref="form">
                                                        <div>
                                                            <bubble-chart :files="files" :safeunsafe="safe"></bubble-chart>
                                                            <bubble-chart :files="files" :safeunsafe="unsafe"></bubble-chart>
                                                        </div>

                                                        <v-btn @click="bubbleGraphDialog = false" class="red white--text">Close</v-btn>
                                                    </v-form>
                                                </v-card-text>
                                            </v-container>
                                        </v-card>
                                    </v-dialog>

                                    <v-dialog v-model="pieGraphDialog" lazy absolute max-width="45%">
                                        <v-card>
                                            <v-container fluid>
                                                <v-card-text>

                                                    <!-- Begin Input Row -->
                                                    <v-form ref="form">
                                                        <div>
                                                            <!--<pie-chart :files="files" :safeunsafe="safe"></pie-chart>-->
                                                            <!--<bubble-chart :files="files" :safeunsafe="safe"></bubble-chart>-->
                                                            <!--<bubble-chart :files="files" :safeunsafe="unsafe"></bubble-chart>-->
                                                        </div>

                                                        <v-btn @click="pieGraphDialog = false" class="red white--text">Close</v-btn>
                                                    </v-form>
                                                </v-card-text>
                                            </v-container>
                                        </v-card>
                                    </v-dialog>
                                </v-card-text>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </template>
        </v-container>
    </v-container>
</template>

<script>
    import { http } from "../config/http2.js";
    import axios from 'axios'
    import BarChart from "../Components/barGraph.vue";
    import BubbleChart from "../Components/bubbleGraph.vue";

    // or import .vue-file, if you have vue-loader


    export default {

        components:{
            BarChart,
            BubbleChart,

        },
        data: () => ({
                files : [],
                graphDialog : false,
            bubbleGraphDialog: false,
            pieGraphDialog: false,
            safe: "safe",
            unsafe: "unsafe",
                filename : "",
                jStringSafe : "",
                jStringUnsafe : ""
            }),
            methods:{
                load() {
                    this.files = null
                    const http2 = axios.create({
                        baseURL: 'https://cz3hyo1nj0.execute-api.us-east-2.amazonaws.com/beta/analysis',
                    })
                    var documentFile = document.getElementById('file');
                    var file = documentFile.value.split("\\");
                    var fileName1 = file[file.length-1];
                    var file2 = fileName1.split("\.");
                    var fileName2 = file2[0];
                    http2
                        .get("?key=" + fileName2 + ".json")
                        .then(response => {
                            this.files = response.data.data;
                            this.setupGraph()
                        })
                        .catch(e => {

                        });
                },
                setupGraph() {
                    this.bubbleGraphDialog = true
                }
            }

          }
</script>

<style>

</style>