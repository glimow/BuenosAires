const index = { template : '#home-template',

  data: function () {
    return {
      stats: {subscriptions:5, projects:10, images:15}
    }
  },

  mounted:function(){
    this.$http.get('/api/v1/stats').then(response => {
      this.stats = response.body;
    }, response => {
      // error callback
    });
  }

}
