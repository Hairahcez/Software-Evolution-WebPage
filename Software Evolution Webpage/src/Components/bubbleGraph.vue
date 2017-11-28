<script>
    //Importing Bubble class from the vue-chartjs wrapper
    import {Bubble} from 'vue-chartjs'
    //Exporting this so it can be used in other components
    export default {

        extends: Bubble,
        data: () => ({
            safekey: [],
            safevalue: [],
            jsonobject: {type: JSON},
            unsafekey: [],
            unsafevalue: [],
            count:0,
            randomCount:0
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
                this.randomCount = 0
                this.safekey = []
                this.safevalue = []
                this.jsonobject = {}
                for (var x in info) {
                    this.safekey.push(x);
                    //this.safevalue[this.randomCount] = Math.floor((Math.random() * 100) + 1);
                    this.jsonobject = {x: Math.floor((Math.random() * 100) + 1), y: Math.floor((Math.random() * 100) + 1),r: info[x]};
                    //this.randomCount++
                    //this.jsonobject.y = Math.floor((Math.random() * 100) + 1);
                    //this.safevalue[this.randomCount] =Math.floor((Math.random() * 100) + 1);;
                    //this.randomCount++
                    //this.jsonobject.r = info[x];
                    //this.safevalue[this.randomCount] =info[x];
                    //this.randomCount++
                    this.safevalue.push(this.jsonobject);
                    this.count++
                }
            },
            getUnsafeKeyValue(info)
            {
                this.count = 0
                this.unsafekey = []
                this.unsafevalue = []
                this.jsonobject = {}
                for (var x in info) {
                    this.unsafekey.push(x);
                    this.jsonobject = {x: Math.floor((Math.random() * 100) + 1), y: Math.floor((Math.random() * 100) + 1),r: info[x]};
                    //this.unsafevalue[this.randomCount] = Math.floor((Math.random() * 50) + 1);
                    //this.randomCount++
                    //this.unsafevalue[this.randomCount] =Math.floor((Math.random() * 50) + 1);;
                    //this.randomCount++
                    //this.unsafevalue[this.randomCount] =info[x];
                    //this.randomCount++
                    this.unsafevalue.push(this.jsonobject)
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
                                data:  this.safevalue


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
                                    backgroundColor: '#f87979',
                                    pointBackgroundColor: 'white',
                                    borderWidth: 1,
                                    pointBorderColor: '#249EBF',
                                    //Data to be represented on y-axis
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