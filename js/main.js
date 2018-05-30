// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// save bookmark
const saveBookmark = (e) => {
    // get form values
    let siteName = document.getElementById("siteName").value;
    let siteURL = document.getElementById("siteURL").value;

    if(!validateForm(siteName, siteURL)){
        return false;
    }

    let bookmark = {
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
        let bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        // fetch from local storage
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
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
const deleteBookmark = (url) => {
    // get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // loop through bookmarks
    for(let i = 0; i < bookmarks.length; i++){
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
const getBookmarks = () => {
    // get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // get output id 
    let bookmarkResults = document.getElementById("bookmarkResults");

    // build output
    bookmarkResults.innerHTML = "";
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarkResults.innerHTML += "<div class='well'>" + 
                                     "<h3> " + name +
                                     " <a class='btn btn-default' target='_blank' href='"+ url +"'>Visit</a> " +
                                     " <a onclick='deleteBookmark(\""+url+"\")' class='btn btn-danger' href='#'>Delete</a>"
                                     "</h3>" + 
                                     "</div>";

    }    
}

// validate form
const validateForm = (siteName, siteURL) => {
    // alert to make sure user fills out site name and url
    if(!siteName || !siteURL) {
        alert("Please fill in the form");
        return false;
    }

    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    if(!siteURL.match(regex)) {
        alert("Please use a valid URL");
        return false;
    }
    return true;
}
