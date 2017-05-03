var app = new Vue({
  el: '#projects',
  data: {
    projects: [
		{title: "The first cool project", subtitle:"with cool peoples and cool stuff", last_update:"Yesterday"},
		{title: "The first cool project", subtitle:"with cool peoples and cool stuff", last_update:"3 days ago"},
		{title: "The first cool project", subtitle:"with cool peoples and cool stuff", last_update:"A week ago"},
		{title: "The first cool project", subtitle:"with cool peoples and cool stuff", last_update:"Last Month"},
	],
	newProject: {title:"",subtitle:"",last_update:""},
	editedProject: {title:"",subtitle:"",last_update:""},
	state: "list",
	classes: ["col-md-0","col-md-8"],
	},
	methods:{
		editProject: function(){
			this.state = "edit"
		},
		getBack: function(){
			this.state = "list"
		},
  	}
})
