const index = { template : '#home-template',

  data: function () {
    return {
      stats : {}
    };
  },

  mounted:function(){
    this.$http.get('/api/stats').then(response => {
      this.stats = response.body;
    }, response => {
      // error callback
    });
  }

}
