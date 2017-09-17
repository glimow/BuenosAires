const subscriptions = { template: '#subscriptions-template',
  data : function(){
    return {
      subscriptions : []
    };
  },
  mounted : function() {
    this.$http.get('/api/subscriptions').then( response => {
      this.subscriptions = response.body;
    }, response => {
      //error callback
    });
  },
};
