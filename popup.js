


$(document).ready(function(){


    function open_link(link){
        console.log(link.href)
        chrome.tabs.create({active: true, url: link});
        
    }

    function render_links(zoomKeys){
        zoomKeys.forEach(element => {
            var myButton = document.createElement("BUTTON")
            
            chrome.storage.local.get(element, function(result) {

                console.log(result[element])
                myButton.id = result[element]; 
                myButton.addEventListener('click', function(){
                    open_link(result[element]);
                });
                myButton.innerHTML = result[element];
            });

            $("#show-v").append(myButton)

        });
    }


    

    var zoomLinks = []

    chrome.storage.local.get(null, function(items) {
        zoomLinks = Object.keys(items);
        //alert(zoomLinks); 
        render_links(zoomLinks)
    });


    $("clear-zoom-info").click(function(){
        chrome.storage.local.clear();
    })
    
    //console.log(zoomLinks.length)

    $("#save-zoom-info").click(function(){
        var newZoomTitle = $("#zoom-title").val();
        var newZoomLink = $("#zoom-link").val();
        if(newZoomLink && newZoomTitle){
            
            var dataObj = {};
            dataObj[newZoomTitle] = newZoomLink;
            chrome.storage.local.set(dataObj, function() {
                // Notify that we saved.
                $("#zoom-title").val("")
                $("#zoom-link").val("");
                console.log("Saved " + newZoomTitle); 
            });
        }
    });

    $("#load-zoom-info").click(function(){
        chrome.storage.local.get(null, function(items) {
            zoomLinks = Object.keys(items);
            //alert(zoomLinks); 
            render_links(zoomLinks)
        });
    });

    //$("#show-v").val() 

});

