// listen for form submit
document.getElementById("bookmarkForm").addEventListener("submit", saveBookmark);

// save bookmark
function saveBookmark(e){
    // get form values
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;


    var bookmark = {
        name: siteName,
        url: siteURL
    }

    /* 
        // Local storage test.  Local storage only stores strings
        localStorage.setItem("test", "hello,world");
        localStorage.getItem("test");
        console.log(localStorage.getItem("test"));
        localStorage.removeItem("test");
        console.log(localStorage.removeItem("test"));
    */


    // test if bookmarks is null
    if (localStorage.getItem("bookmarks") === null){
        //init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        // fetch bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        // add bookmark to array
        bookmarks.push(bookmark);
        // re-set to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }


    // prevents the form from submitting
    e.preventDefault();
}

// fetch bookmarks

function fetchBookmarks(){
    // fetch bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));    
    // get output id 
    var bookmarkResults = document.getElementById("bookmarkResults");

    // build the output 
    bookmarkResults.innerHTML = "";
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="card">'+
                                     '<h4>' +name+
                                     '</h4>' +
                                     '</div>';

    }
}