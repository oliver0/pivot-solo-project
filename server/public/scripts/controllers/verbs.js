app.controller("VerbsController", ["$http", "AuthFactory", function($http, AuthFactory){

  console.log("VerbsControler running");

  var self = this;

  getVerbTableData();

  function getCurrentUserId(){
    console.log('HELLO!');
    return AuthFactory.currentUserId();
  }

  function getVerbTableData() {
    console.log('getVerbTableData() ');
    //var user_id = getCurrentUserId()
    //console.log(user_id);;
    currentUser = AuthFactory.getCurrentUser();
    //console.log('CURRENT USER:', currentUser);
    if(currentUser) {
      currentUser.getToken().then(function(idToken){
        //console.log('USER:', idToken);
        return $http({
          method: 'GET',
          url: '/verb_table',
          headers: {
            id_token: idToken
          }
        })
        .then(function(verbTableData) {
              self.tableData = verbTableData.data.verbData;
              console.log(self.tableData);
            });
          });
        }
      }
  }]);
