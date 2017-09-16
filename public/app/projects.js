const projects = { template: '#projects-template',
  data : function(){
    return {
      projects : []
    };
  },
  mounted : function() {
    this.$http.get('/api/projects').then( response => {
      this.projects = response.body;
    }, response => {
      //error callback
    });
  },
};
