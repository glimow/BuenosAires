const list_projects = { template: '#list-projects-template',

  data : function(){
    return {
      projects : [],
      searchString: '',
    };
  },

  mounted : function() {
    this.$http.get('/api/v1/projects').then( response => {
      this.projects = response.body;
    }, response => {
      //error callback
    });
  },

  methods: {
    deleteProject: function(id){
      this.$http.delete('/api/projects/'+id).then( response => {
        //success callback
        console.log(response);
        this.projects = this.projects.filter((project)=>{return project.id != id});

      }, response => {
        //error callback
        console.log(response);

      });
    },
  }
};
