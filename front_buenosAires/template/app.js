function copy(object){
	return JSON.parse(JSON.stringify(object));
}



var app = new Vue({
  el: '#projects',
  data: {
	searchString: "",
    projects: [
		{title: "The first cool project", subtitle:"with cool peoples and cool stuff", last_update:"Yesterday"},
		{title: "The first cool project", subtitle:"with cool peoples and cool stuff", last_update:"3 days ago"},
		{title: "The first cool project", subtitle:"with cool peoples and cool stuff", last_update:"A week ago"},
		{title: "The THIRD", subtitle:"with cool peoples and cool stuff", last_update:"Last Month"},
	],
	sampleProject: {title:"",subtitle:"",last_update:""},
	newProject: {title:"",subtitle:"",last_update:""},
	editedProject: {title:"",subtitle:"",last_update:""},
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
				if(project.title.indexOf(this.searchString.split(" ")[i])==-1 && project.subtitle.indexOf(this.searchString.split(" ")[i])==-1 ){
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
			this.projects.push(this.newProject);
			toastr.success(this.newProject.title, 'Projet Ajouté !');
			this.newProject = copy(this.sampleProject);
			this.state = "list";
		},

		saveEditedProject: function(){
			this.projects[this.editedIndex] = copy(this.editedProject);
			toastr.success(this.editedProject.title, 'Modification enregistrée !');
			this.editedProject = copy(this.sampleProject);
			this.state = "list";
		},
  	}
})
