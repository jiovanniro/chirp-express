document.addEventListener("DOMContentLoaded", function(){   
    
    $('#chirp-input').on("keyup", function(){
        if($('#chirp-input').val().length > 0) {
            $('#send-chirp').removeAttr('disabled');
        } else {
            $('#send-chirp').attr('disabled', 'disabled');   
        }  
    });
    
    
    $(function(){
        let $all_chirps = $("#all-chirps");
        let $chirp_input = $("#chirp-input");
        let $user = $("#user");
    
        $.ajax({
            method: "GET", 
            url: "/api/chirps", 
            contentType: "application/json",
    
            success: function(data) {
                console.log("success", data);
                console.log("user: " + data.user);
 
                for(let i=0; i<data.length; i++){     
                    $all_chirps.append('<div id="user" class="chirp-data">' + data[i].user + '</div>');                     
                    $all_chirps.append('<div id="message" class="chirp-data">' + data[i].message + '</div>');                     
                    $all_chirps.append('<div id="timestamp" class="chirp-data">' + data[i].timestamp + '</div>'); 
                }
            }, 
            error: function(){
                alert('error loading chirps');
            }
        });//end of get request
    
        $("#send-chirp").on('click', function(){
        
            let currentDate = new Date();
            
            let myChirpObj = {
                message: $chirp_input.val(),
                user: $user.val(),
                timestamp: currentDate.toUTCString(),
            };
            
            $.ajax({
                method: "POST", 
                url: "/api/chirps", 
                contentType: "application/json",
                data: JSON.stringify(myChirpObj)
            });//end of post request
        });//end of onsubmit function
    });//end of ajax functions 
    
});
    
    //function checkInput() {
    
    
    
    /*Resources: 
    https://www.sitepoint.com/use-jquerys-ajax-function/
    
    */