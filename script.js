$(document).ready(function() {
    const url = "https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec";
    // const result;
    $.ajax({
        url,
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {

            const courseName = res.map(e => e.course_name);
            const timeSlot = res.map(e => e.slots)
            console.log(courseName);
            // console.log(timeSlot[0][0].slot);
            var scratchJuniorDate = [];
            var gameDevDate = [];
            var appDevDate = [];
            var webDevDate = [];
            var pythonDate = [];

            var scratchJuniorTime = [];
            var gameDevTime = [];
            var appDevTime = [];
            var webDevTime = [];
            var pythonTime = [];

            for(var i=0; i<timeSlot.length; i++) {
                for(var j=0; j<timeSlot[i].length; j++) {

                    unixTimestamp = timeSlot[i][j].slot;
                    
                    var date = convertToDate(unixTimestamp);
                    var time = convertToTime(unixTimestamp);

                    var time_num = 0;
                    if(time[1] === ":") time_num = Number(time[0]);
                    else time_num = Number(time.slice(0,2));
                    
                    var d = new Date();
                    var hours = d.getHours();                

                    if(i==0) {
                        scratchJuniorDate.push(date);
                        if(time_num-hours > 3 || time_num-hours<0)
                            scratchJuniorTime.push(time);
                    }
                    else if(i==1) {
                        gameDevDate.push(date);
                        if(time_num-hours > 3 || time_num-hours<0)
                            gameDevTime.push(time);
                    }
                    else if(i==2) {
                        appDevDate.push(date);
                        if(time_num-hours > 3 || time_num-hours<0)
                            appDevTime.push(time);
                    }
                    else if(i==3) {
                        webDevDate.push(date);
                        if(time_num-hours > 3 || time_num-hours<0)
                            webDevTime.push(time);
                    }
                    else if(i==4) {
                        pythonDate.push(date);
                        if(time_num-hours > 3 || time_num-hours<0)
                            pythonTime.push(time);
                    }

                }
                // console.log(timeSlot[i]);                
            }
            for(var i=0; i<courseName.length; i++){
                $('#course_name').append(`<option>${courseName[i]}</option>`)
            }
                
            var scratchJuniorTimeU = [];
            var gameDevTimeU = [];
            var webDevTimeU = [];
            var appDevTimeU = [];
            var pythonTimeU = [];

            $.each(scratchJuniorTime, function(i, el){      
                if($.inArray(el, scratchJuniorTimeU) === -1) scratchJuniorTimeU.push(el);                
            });
            $.each(gameDevTime, function(i, el){
                if($.inArray(el, gameDevTimeU) === -1) gameDevTimeU.push(el);
            });
            $.each(webDevTime, function(i, el){
                if($.inArray(el, webDevTimeU) === -1) webDevTimeU.push(el);
            });
            $.each(appDevTime, function(i, el){
                if($.inArray(el, appDevTimeU) === -1) appDevTimeU.push(el);
            });            
            $.each(pythonTime, function(i, el){
                if($.inArray(el, pythonTimeU) === -1) pythonTimeU.push(el);
            });            
            
            // for(var i=0; i<scratchJuniorTime.length; i++)
            //     console.log(scratchJuniorTimeU[i]);

            scratchJuniorTimeU.sort();
            gameDevTimeU.sort();
            webDevTimeU.sort();
            appDevTimeU.sort();
            pythonTimeU.sort();
            
            scratchJuniorDate.sort();
            gameDevDate.sort();
            webDevDate.sort();
            appDevDate.sort();
            pythonDate.sort();

            $("select.course_name").change(function(){
                var c_name = $(this).children("option:selected").val();
                if(c_name == "Scratch Junior") {
                    for(var i=0; i<scratchJuniorDate.length; i++) {
                        $('#choose_date').append(`<option>${scratchJuniorDate[i]}</option>`);
                    }
                }
                else if(c_name == "Game Development") {
                    for(var i=0; i<gameDevDate.length; i++) {
                        $('#choose_date').append(`<option>${gameDevDate[i]}</option>`);
                    }
                }
                else if(c_name == "App Development") {
                    for(var i=0; i<appDevDate.length; i++) {
                        $('#choose_date').append(`<option>${appDevDate[i]}</option>`);
                    }
                }
                else if(c_name == "Web Development") {
                    for(var i=0; i<webDevDate.length; i++) {
                        $('#choose_date').append(`<option>${webDevDate[i]}</option>`);
                    }
                }
                else if(c_name == "Python") {
                    for(var i=0; i<pythonDate.length; i++) {
                        $('#choose_date').append(`<option>${pythonDate[i]}</option>`);
                    }
                }
                if(c_name == "Scratch Junior") {
                    $("#choose_time option").remove()
                    for(var i=0; i<scratchJuniorTimeU.length; i++) {
                        $('#choose_time').append(`<option>${scratchJuniorTimeU[i]}</option>`);
                    }
                }
                else if(c_name == "Game Development") {
                    $("#choose_time option").remove()
                    for(var i=0; i<gameDevTimeU.length; i++) {
                        $('#choose_time').append(`<option>${gameDevTimeU[i]}</option>`);
                    }
                }
                else if(c_name == "App Development") {
                    $("#choose_time option").remove()
                    for(var i=0; i<appDevTimeU.length; i++) {
                        $('#choose_time').append(`<option>${appDevTimeU[i]}</option>`);
                    }
                }
                else if(c_name == "Web Development") {
                    $("#choose_time option").remove()
                    for(var i=0; i<webDevTimeU.length; i++) {
                        $('#choose_time').append(`<option>${webDevTimeU[i]}</option>`);
                    }
                }
                else if(c_name == "Python") {
                    $("#choose_time option").remove()
                    for(var i=0; i<pythonTimeU.length; i++) {
                        $('#choose_time').append(`<option>${pythonTimeU[i]}</option>`);
                    }
                }
                // console.log(typeof(c_name));
            });

        }
    });
})

function convertToDate(unixTimestamp) { 
    var a = new Date(unixTimestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month;
    return time;
} 

function convertToTime(unixTimestamp) {
    var a = new Date(unixTimestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = hour + ':' + min;
    return time;
}