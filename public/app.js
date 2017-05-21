const DEBUG = false;

function copy(object){
	return JSON.parse(JSON.stringify(object));
}
pretty = (obj) => JSON.stringify(obj, null, 2);

var app = new Vue({
   http: {
    root: 'http://localhost:3000/api/v1',
    headers: {
      authorization: 'authentication-QWxhZGRpbjpvcGVuIHNlc2FtZQ'
    },
		emulateJSON: true,
		emulateHTTP: true
},
  el: '#projects',
  data: {
	searchString: "",
    projects: [
	],
	sampleProject: {title:"",subtitle:"",last_update:"",text:""},
	newProject: {title:"",subtitle:"",last_update:"",text:""},
	editedProject: {title:"",subtitle:"",last_update:"",text:""},
	editedIndex: 0,
	state: "list",
	classes: ["col-md-0","col-md-8"],
	},
	methods:{

		nullfunction: function() {
			return O;
		},

		isSearched:function(project){
			if (this.searchString == "") {return true}
			for (var i = 0; i < this.searchString.split(" ").length; i++) {
				if(project.title.toLowerCase().indexOf(this.searchString.toLowerCase().split(" ")[i])==-1 && project.subtitle.indexOf(this.searchString.split(" ")[i])==-1 ){
					return false;
				}
			}
			return true
		},

		changeState: function(state){
			console.log(state)
			this.state = state;
		},

		editProject: function(index){
			this.state = "edit";
			this.editedProject = copy(this.projects[index]);
			this.editedIndex = index;
		},

		getBack: function(){
			this.state = "list";
			this.newProject = copy(this.sampleProject);
			this.editedProject = copy(this.sampleProject);
		},

		saveNewProject: function(){
			var newProject = this.newProject;
			console.log(newProject.title);
			this.$http.post('projects', newProject)
				.then(response => {
			    // success callback
					response = response.body;
					console.log(response);
					if (response.state=="success") {
						toastr.success('Nouveau projet ajouté', this.newProject.title);
						this.projects.push(response.project);
						this.newProject = copy(this.sampleProject);
						this.state = "list";
					} else {
						toastr.error(this.newProject.title, 'Un problème est survenu lors de l\'ajout du projet' + DEBUG ? pretty(response.err) : "");
					}
			  }, response => {
			    // error callback
					response = response.json();
					toastr.error(this.newProject.title, 'Un problème est survenu lors de la connexion au serveur' + DEBUG ? pretty(response):"");
			  });;
		},

		saveEditedProject: function(){
			this.$http.post('projects/'+this.editedProject._id, JSON.stringify(this.editedProject))
				.then(response => {
			    // success callback
					response = response.body;
					if (response.state=="success") {
						toastr.success(this.editedProject.title, 'Modification enregistrée !');
						// this.projects[this.editedIndex] = copy(response.body.project);
						//this.$set(this.projects, this.editedIndex, copy(response.project));
						this.getProjects();
					} else {
						toastr.error(this.editedProject.title, 'Un problème est survenu lors de la modification du projet' + DEBUG ? pretty(response.err) : "");
					}
			  }, response => {
			    // error callback
					toastr.error(this.editedProject.title, 'Un problème est survenu lors de la connexion au serveur');
			  });;
			this.editedProject = copy(this.sampleProject);
			this.state = "list";
		},

		getProjects: function(){
			this.$http.get('projects').then(response => {
			  console.log(response.json());
				this.projects = copy(response.body).reverse();
			}, response => {
			  console.log(response);
				toastr.danger("Problème de connexion", 'Un problème est survenu lors de la connexion au serveur');
			});
		},

  	}
})


app.getProjects();
