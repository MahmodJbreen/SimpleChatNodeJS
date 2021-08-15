var user = "ahmad";
var isTyping =false;
var randomColor = Math.floor(Math.random()*16777215).toString(16);
alert(randomColor);
	var socket= io();
 let person = prompt("Please enter your name:", "");
  if (person == null || person == "") {
    alert("you r a guest");
    user = "guest";
  } else {
    user = person;
  }




$('#mybtn').click(function() {
	socket.emit('chat message',{'usermsg':$('#inputchat').val(),'user':user});
	$('#inputchat').val('');

			socket.emit('StopTyping',user);



});





 $("#inputchat").on("input", function(){




					if(isTyping==false){
							isTyping = true;
							socket.emit('isTyping',user);

					}



						if($('#inputchat').val()=="" )
							{

							socket.emit('StopTyping',user);
			
						}


	    });


$(window).keydown(event=> {
    
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
     $("#inputchat").focus();
    }
    
    if (event.which === 13) {
     	socket.emit('chat message',{'usermsg':$('#inputchat').val(),'user':user});
	$('#inputchat').val('');
		socket.emit('StopTyping',user);
    }
  });




 socket.on('isTyping',function(msg){
		
							//$("#chatBoard").append($('<li>').text(user +" Typing..."));
						if(msg!=user){
						$("#isTyping").show("slow");
						$("#isTyping").html(msg +" is Typing...");

							}
						});


		socket.on('StopTyping',function(msg){
						isTyping=false;
					$("#isTyping").innerHTML = "";
			$("#isTyping").hide("slow");
					 
				});


	socket.on('get message',function(msg){



if(msg.user == user){
$("#chatBoard").append($('<li class="user">').text(msg.user+":"+msg.usermsg));

//$( "#chatBoard" ).html( "<li> "+msg.user+ ":" +msg.usermsg+" </li>" );
}
else{
$("#chatBoard").append($('<li class="resvedUser">').text(msg.user+":"+msg.usermsg));
}
//$( "#chatBoard" ).html( "<li style='color:#"+randomColor+";' > "+msg.user+ ":" +msg.usermsg+" </li>" );

	});







