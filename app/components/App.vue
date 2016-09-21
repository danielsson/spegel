<template>

    <div class="frame fill">
        <div class="inner-frame fill ">
            <div class="container">
                <div class="row">
                    <div class="offset-by-six six columns">
                        <news></news>

                        <graph></graph>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

    import Weather from './Weather.vue'
    import News from './News.vue'
    import Graph from './Graph.vue'

    export default {
        data: function () {
            return {
                message: "Hello World"
            };
        },
        components : { Weather, News, Graph }
    }
</script>