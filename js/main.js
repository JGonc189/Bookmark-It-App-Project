// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// save bookmark
function saveBookmark(e){
    // get form values
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;

    if(!validateForm(siteName, siteURL)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    }

    /*
        // local storage test
        localStorage.setItem("test", "Hello, World");
        console.log(localStorage.getItem("test"));
        localStorage.removeItem("test");
        console.log(localStorage.removeItem("test"));
    */

    // test if bookmarks is null
    if(localStorage.getItem("bookmarks") === null){
        // init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        // fetch from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        // add bookmark to aray
        bookmarks.push(bookmark);
        // re-set back to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById("myForm").reset;

    // get book marks again
    getBookmarks();    

    // prevent form from submitting
    e.preventDefault();
}

// delete bookmark
function deleteBookmark(url) {
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i,1);
        }
    }
    // re-set back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // get book marks again
    getBookmarks();
}

// get bookmarks
function getBookmarks(){
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // get output id 
    var bookmarkResults = document.getElementById("bookmarkResults");

    // build output
    bookmarkResults.innerHTML = "";
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarkResults.innerHTML += "<div class='well'>" + 
                                     "<h3> " + name +
                                     " <a class='btn btn-default' target='_blank' href='"+ url +"'>Visit</a> " +
                                     " <a onclick='deleteBookmark(\""+url+"\")' class='btn btn-danger' href='#'>Delete</a>"
                                     "</h3>" + 
                                     "</div>";

    }    
}

// validate form
function validateForm(siteName, siteURL) {
    // alert to make sure user fills out site name and url
    if(!siteName || !siteURL) {
        alert("Please fill in the form");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteURL.match(regex)) {
        alert("Please use a valid URL");
        return false;
    }
    return true;
}
