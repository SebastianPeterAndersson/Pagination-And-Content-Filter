
var currentPagPage;

// The amount of students per page.
var maxStudents = 10;

// Creating and constructing array that holds att the students.
var allStudentsArr = $.makeArray($(".student-item"));


// Function that removes all of the students from the page.
// But not from the arrays that's storing them.
function removeStudents() {
    $(".student-item").remove();
}


// Function that provides the right amount of pagination pages needed
// for the amount of students in the provided list as an argument.
// The length of the array has to be provided in order for the function to work.
function constructPagPages(listLength) {
    //Removes the pagination container if it has been constructed already.
    $(".pagination").remove();

    // Appending the pagination container with the pagination class.
    $(".page").append($("<div class='pagination'><ul></ul></div>"));
    var pagesNeeded = Math.ceil( listLength / maxStudents );
    console.log(pagesNeeded);

    // Loops through the pages that are needed, constructing pag pages accordingly.
    // The ones (1) in the for loop are there to accommodate the zero-index.
    for (var i = 1; i < pagesNeeded + 1; i++ ) {
        $(".pagination").append($("<li><a>" + i + "</a></li>"));
    }
    // Assigning the class 'active' to the first anchor element in the list.
    $(".pagination a:first").addClass("active");
}


// Function that constructs the search elements.
function constructSearch() {
    $(".page-header").append($("<div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>"));
}

// Function that is to be triggered when the pagination anchor element is clicked.
function paginationClicked() {
    // Removes all the sibling anchor elements classes.
    $(this).parent().parent().children().children().removeClass("active");
    $(this).addClass("active");
    // Adds the class active to the selected anchor.
    currentPagPage = $("a.active").text();
    console.log(currentPagPage);
    paginate(allStudentsArr, $("a.active").text());

}

// Function that is to be triggered when the search button is clicked.
function buttonClicked() {
    removeStudents();


    // Adds the class active to the selected anchor.
    currentPagPage = $("a.active").text();
    console.log(currentPagPage);
    paginate(allStudentsArr, $("a.active").text());
    // Store what's typed in to the search input in a variable.
    var userSearch = $("input").val();

    // Creating an array for the successfully searched array objects.
    var userSearchArr = [];

    // Iterating through every single student, looking for a match, if a match
    // is found, push it to the userSearchArr, then appending the objects
    // within that array to the student list container.
    $.each(allStudentsArr, function() {
        var studentName = $(this).find("h3").text();
        var filterThrough = studentName.indexOf(userSearch);
        console.log(filterThrough);

        if (filterThrough !== -1) {
            userSearchArr.push($(this));
        }

    });

    constructPagPages(userSearchArr.length);
    paginate(userSearchArr);
    console.log($(".active").text());

}


// Function that cycles through the array provided as an argument and calculates
// which part of the array to be displayed, and displays them accordingly.
function paginate(list) {
    // Removes all the items from the document. But because we are storing
    // the items in an array, nothing is really lost.
    removeStudents();

    // Declaring the array that is to be filled with the students needed
    // based on which pagination anchor element is clicked.
    var arrToShow = [];

    // Variable that decides where the counting of the students should start
    // based on which pagination anchor element has the class of 'active'.
    var headIndex = $(".active").text() * maxStudents;

    // Variable that goes together with the headIndex.
    var tailIndex = headIndex - 10;

    // Pushes the students, that have been chosen by the parameters of the function,
    // to the arrToShow array.
    for ( var i = tailIndex; i < headIndex; i++ ) {
        arrToShow.push(list[i]);
    }
    // Displays all of the objects within the arrToShow array.
    for ( i = 0; i < arrToShow.length; i++ ) {
        $(".student-list").append(arrToShow[i]);
    }
}

// Initial functions:
removeStudents();
constructSearch();
constructPagPages(allStudentsArr.length);
paginate(allStudentsArr);

// Event click handler that targets the pagination buttons.
$(".pagination a").click(paginationClicked);

$("button").click(buttonClicked);
