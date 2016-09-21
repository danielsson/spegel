<template>
    <h5 class="text-right">{{stories[story_index].title}}</h5>

</template>


<script>
    import Chartist from 'chartist'

    export default {
        data: function () {
            return {
                stories: [{title: "Top News From the New York Times"}],
                story_index: 0
            };
        },
        ready: function() {
            this.fetchNews();
            var vm = this;
            setInterval(function () {
                vm.story_index = (vm.story_index + 1) % vm.stories.length;
            }, 15000);


            setInterval(this.fetchNews(), 1000 * 60 * 5);

        },
        methods: {
            fetchNews: function () {
                this.$http.get('https://api.nytimes.com/svc/topstories/v2/world.json', {
                    params: {
                        'api-key': "64fda3288d624a699d742cf7a24d82ec"
                    }
                }).then((response) => {
                    this.$set('stories', response.body.results);
                }, (response) => {
                    console.log(response);
                });

            }
        }
    }
</script>