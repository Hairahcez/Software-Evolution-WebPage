<script>
    //Importing Bar class from the vue-chartjs wrapper
    import {Bar} from 'vue-chartjs'
    //Exporting this so it can be used in other components
    export default {
        extends: Bar,
        data: () => ({
            safekey: [],
            safevalue: [],
            unsafekey: [],
            unsafevalue: [],
            count:0
        }),
        props:{
            files:{type: Object},
            safeunsafe:{type: String}
        },
        watch:{
            files: function()
            {
                this.getGraph()
            }
        },
        methods: {
            getSafeKeyValue(info)
            {
                this.count = 0
                this.safekey = []
                this.safevalue = []
                for (var x in info) {
                    this.safekey[this.count] = x;
                    this.safevalue[this.count] =info[x];
                    this.count++
                }
            },
            getUnsafeKeyValue(info)
            {
                this.count = 0
                this.unsafekey = []
                this.unsafevalue = []
                for (var x in info) {
                    this.unsafekey[this.count] =x;
                    this.unsafevalue[this.count] =info[x];
                    this.count++
                }
            },
            getGraph()
            {
                // Overwriting base render method with actual data.
                this.safe = this.files.safe
                this.unsafe = this.files.unsafe
                this.getSafeKeyValue(this.safe)
                this.getUnsafeKeyValue(this.unsafe)
                if(this.safeunsafe == "safe")
                {
                    if(this.$data._chart)
                    {
                        this.$data._chart.destroy()
                    }
                    this.renderChart({

                        labels: this.safekey,
                        datasets: [
                            {
                                label: 'Safe Functions',
                                backgroundColor: '#f30352',
                                data: this.safevalue
                            }
                        ]

                    })
                }
                else {
                    if(this.$data._chart)
                    {
                        this.$data._chart.destroy()
                    }
                    this.renderChart({
                        labels: this.unsafekey,
                        datasets: [
                            {
                                label: 'Unsafe Functions',
                                backgroundColor: '#f30352',
                                data: this.unsafevalue
                            }
                        ]
                    })
                }
            }
        },
        mounted () {
            this.getGraph()

        },

    }
</script>