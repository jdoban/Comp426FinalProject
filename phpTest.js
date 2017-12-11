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
     /*
     $('#test_form').on('submit', function(e){
       e.preventDefault();
       $.ajax(base_url + "/Debt.php/",
     	       {type: "POST",
     		       dataType: "json",
               data: $(this).serialize(),
     		       success: function(user_ids, status, jqXHR) {
                  console.log("successful post");
     		       },
                error: function(exception){

                  alert('Exception:'+JSON.stringify(exception)+'it didnt work');}
          })
     })
     */
     $('#id_test').on('submit', function(e){
       e.preventDefault();
       console.log($(this).serialize());
       $.ajax(base_url + "/Users.php/",
     	       {type: "POST",
     		       dataType: "json",
               data: $(this).serialize(),
     		       success: function(user_ids, status, jqXHR) {
                  console.log("successful post");
     		       },
                error: function(exception){
                alert('Exception:'+JSON.stringify(exception));}
          })
     })



   });
