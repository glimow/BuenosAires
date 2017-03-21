var app = new Vue({
  el: '#inscription',
  data: {
    name:"Mzoey99",
    firstName:"Marine",
    email:"marinekoubi@aol.com",
  },
  methods: {
    sendData: function(){
      //we add (POST) a subscription (subscriptions) with the api
      //TODO : best error handling
      this.$http.post('/api/v1/subscriptions', {name:this.name, firstName:this.firstName, email:this.email}).then(console.log("success"), console.log("error"));
    },
  }
})
