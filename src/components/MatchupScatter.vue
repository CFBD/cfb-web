<script>
    import { Scatter, mixins } from 'vue-chartjs';
    const { reactiveProp } = mixins;

    export default {
        extends: Scatter,
        props: ['options'],
        mixins: [reactiveProp],
        mounted() {
            this.renderChart(this.chartData, this.options);
        },
        watch: {
            options: function () {
                this.renderChart(this.chartData, this.options);
            }
        }
    }

</script>
