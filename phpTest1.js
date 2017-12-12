var base_url = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/mtyndall/finalproject";

$(document).ready(function(){
  console.log("this happened");
  $.ajax(base_url + "/Users.php/" + "1",
	       {type: "GET",
		       dataType: "json",
		       success: function(user_ids, status, jqXHR) {
             console.log("connected");
             $('#user_id_list').append(JSON.stringify(user_ids) + '\n');
		       },
           error: function(exception){alert('Exception:'+JSON.stringify(exception));}
     })

     $('#id_test').on('submit', function(e){
       e.preventDefault();
                   $.ajax({
                            url: base_url + '/Users.php/',
                            type: "POST", //send it through get method
                            data: $('#id_test').serialize(),
                            success: function(response) {
                              console.log(response);
                              console.log('it worked');
                            },
                            error: function(xhr) {
                              console.log("nope");
                            }
            });
     })



   });
