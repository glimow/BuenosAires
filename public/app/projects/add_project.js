const add_project = { template: '#add-project-template',

  data : function(){
    return {
      project: {title:"", subtitle:"", last_update:"", text:""},
    };
  },

  methods: {

    done: function(){
      this.$http.post('/api/v1/projects', this.project).then( response => {
        //Success Callback
        console.log(response.body);

        if (response.body.state=="error") {
          //TODO: error handling
        } else {
          location.href = 'admin#/projets';
        }
      }, response => {
        //Error Callback
        console.log(response.body);
      });
    },

    validate: function(){
      return (this.project.title != "") && (this.project.subtitle != "")
    },

  },

};
