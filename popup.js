


$(document).ready(function(){

    

    function open_link(link){
        console.log(link.href)
        chrome.tabs.create({active: true, url: link});
    }



    function render_links(zoomKeys){

        //Empty UL List
        $("#ul_id").empty();

        //Generate Buttons
        zoomKeys.forEach(element => {
            chrome.storage.local.get(element, function(result) {

                var li_elem = document.createElement('li'); //Create li_element
                var cancel_button = document.createElement('span')

                li_elem.innerHTML = element; //Set Title of LI
                li_elem.classList.add("btns") //Set CSS Class

                cancel_button.innerHTML = "X"
                cancel_button.classList.add("delete_div")

                li_elem.append(cancel_button)

                document.getElementById("ul_id").appendChild(li_elem)
                 
                li_elem.addEventListener('click', function(){
                    open_link(result[element]);
                });
            });

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

