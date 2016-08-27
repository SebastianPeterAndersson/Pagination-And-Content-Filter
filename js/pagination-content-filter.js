

// *********         ****************      *************************************
// *   **************  **     ***    ****       ***      *****           *******
// ********   ****  PAGINATION AND CONTENT FILTER SCRIPT   *********************
// **   ************          ***********         ****           ***************
// ********   *******  **     ***    ****  *******     *** *******  ****      **


// Function that makes sure the DOM is finished loading all of its information.
$(document).ready(function(){

// *****************************************************************************
// ***************************  VARIABLES   ************************************
// *****************************************************************************

// Number of students to be shown at a time.
var maxStudents = 10;

// Creating array out of the html elements.
var allStudentsArr = $.makeArray($(".student-item"));


// *****************************************************************************
// ***************************  FUNCTIONS   ************************************
// *****************************************************************************

// Function that removes all of the students from the page.
// But not from the arrays that's storing them.
function removeStudents() {
    $(".student-item").remove();
}


// Function that provides the right amount of pagination anchors needed
// for the amount of students in the provided list as an argument.
// The length of the array has to be returned to the argument.
function constructPagPages(listLength) {
    //Removes the pagination container if it has been constructed already.
    $(".pagination").remove();

    // Appending the pagination container with the pagination class.
    $(".page").append($("<div class='pagination'><ul></ul></div>"));

    //Calculating how many pagination pages are needed and storing the value in
    // a variable.
    var pagesNeeded = Math.ceil( listLength / maxStudents );

    // If no more than one pagination anchor is needed, do not construct the pagination.
    if (pagesNeeded === 1) {
        $(".pagination a:first").addClass("active");
    }

    else {
        // Loops through the pages that are needed, constructing  pages accordingly.
        // The ones (1) in the for loop are there to accommodate the zero-index.
        for (var i = 1; i < pagesNeeded + 1; i++ ) {
            $(".pagination").append($("<li><a>" + i + "</a></li>"));
        }

        // Assigning the class 'active' to the first anchor element in the list.
        $(".pagination a:first").addClass("active");

        // Event click handler that targets the pagination buttons.
        $(".pagination a").click(paginationClicked);
    }

}


// Function that constructs the search elements.
function constructSearch() {
    $(".page-header").append($("<div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>"));
}


// Function that is to be triggered when the pagination anchor element is clicked.
function paginationClicked() {

    // Removes all the sibling anchor elements 'active' classes and adds one to
    // the one that's clicked.
    $(this).parent().parent().children().children().removeClass("active");
    $(this).addClass("active");

    // Adds the class active to the selected anchor.
    currentPagPage = $(this).text();
    paginate(allStudentsArr, $(this).text());
}

// Function that is to be triggered when the search button is clicked.
function buttonClicked() {

    // If there are any paragraph tags that have been created from the lack of
    //  students in the usersearcharr array, remove them.
    if ($(".student-list").find("p")) {
        $("p").remove();
    }

    // Removing all lingering students.
    removeStudents();

    // Store the value of the search input.
    var userSearch = $("input").val().toLowerCase();

    // Creating an array for the successfully searched array objects.
    var userSearchArr = [];

    // Iterating through every single student, looking for a match. If a match
    // is found, push it to the userSearchArr. Then appending the objects
    // within that array to the student list container.
    $.each(allStudentsArr, function() {

        // Each of the student emails and student name in the form of a string.
        var studentName = $(this).find("h3").text();

        // Each of the student emails in the form of a string.
        var studentEmail = $(this).find("span").text();

        //Combining the student name and email into a single string and
        // rendering it lowercase.
        var studentInfo = studentName + " " + studentEmail.toLowerCase();

        // Filters each student and returning an index value.
        var filterThrough = studentInfo.indexOf(userSearch);

        // Takes each index value and pushes student to the userSearchArr array.
        // One after one.
        if (filterThrough !== -1) {
            userSearchArr.push($(this));
        }
    });

    // If the userSearchArr array is empty, that is if no mathces are found,
    // add 'no students found'-message.
    if (userSearchArr.length === 0) {
        $(".student-list").append($("<p>Couldn't find any students. Try again!</p>"));
    }

    // Constructs a new set of pagination pages and paginates the 10 first
    // students by providing a '1' to the second argument of the
    // paginate function.
    constructPagPages(userSearchArr.length);
    paginate(userSearchArr, 1);

}


// Function that cycles through the array provided as an argument and calculates
// which part of the array to be displayed, and displays them accordingly.
function paginate(list, selected) {

    // Removes all the items from the document. But because we are storing
    // the items in an array, nothing crucial is lost.
    removeStudents();

    // Declaring the array that is to be filled with the students needed
    // based on which pagination anchor element is clicked.
    var arrToShow = [];

    // Variables that decides where the displaying of the students should start
    // and end in the array traversing based on which pagination anchor
    // element has the class of 'active'.
    var headIndex = selected * maxStudents;
    var tailIndex = headIndex - 10;

    // Pushes the students, that have been chosen by the parameters of this
    // function to the arrToShow array.
    for ( var i = tailIndex; i < headIndex; i++ ) {
        arrToShow.push(list[i]);
    }

    // Displays all of the objects within the arrToShow array.
    for ( i = 0; i < arrToShow.length; i++ ) {
        $(".student-list").append(arrToShow[i]);
    }
}


// *****************************************************************************
// *******************  Initial function calls   *******************************
// ******************* when the page is loaded.   ******************************
// *****************************************************************************

    removeStudents();
    constructSearch();
    constructPagPages(allStudentsArr.length);
    paginate(allStudentsArr, 1);

    $("button").click(buttonClicked);

});
