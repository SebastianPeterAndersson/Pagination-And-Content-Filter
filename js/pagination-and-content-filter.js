// *** DONE ***
// Use the filters-example.html file to guide your decision making. Using progressive enhancement, your work should affect the index.html file.
// Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number
// of links to the bottom of the page.


//************* GLOBAL VARIABLES *************//


// The 'PP' in studentsPerPage stands for 'studentsPerPage'
var studentsPP = 10;    // Only 10 students should be shown per pagination page.

var pagesNeeded;

var pagPages;

var $students = 0;

var pageContainer = $(".page"); // The container that surrounds everything.

var pagination = $("<div class='pagination'></div>"); // The pagination container.

var $studentItem = $(".student-item");

//Creating an array of the student items that can be accessed any time.


// The pagination anchor clicked
var pagSelected;

var container = $("<div></div>");

var searchInput = $("<input></input>");

var searchButton = $("<button></button>");

var studentsFoundArr;

//What was searched in the input search.


//************* FUNCTIONS *************//


// calculate the amount of jquery student items per page shown.
function calculate$students() {
    $(".student-item:visible").each(function(){
        $students++;
    });
    console.log("Calculated amount of student-items shown. There are " + $students + " of them.");
}


// Calculates the amount of pagination pages needed based on the number of students.
function calculatePagesNeeded() {
    pagesNeeded = Math.ceil($students / studentsPP);
    console.log("You need " + pagesNeeded  + " pages for the pagination");
}


//Hides all jquery students on the page.
function hideStudents() {
    $(".student-list").each(function() {
        $(this).children().hide();
    });
    console.log("Hiding ALL jquery students.");
}
// Calculates the jquery .student-items that are exclusively visible on the page.

function showStudents() {
    $studentItem.each(function(){
        $(this).show();
    });
}

// Appending the right number of Pagination Pages to the bottom of the page.
function addPages() {
    pageContainer.append(pagination); // Initially placing the pagination withing the container.

    // For each page that is needed, append a pagination anchor to the pagination contiainer.
    for (var i = 1; i < pagesNeeded + 1; i++ ) {   // I am adding one to both variables since I don't wish to have the pagination start at 0.
        pagButton = $("<li><a href='#'>" + i + "</a></li>");
        pagination.append(pagButton);
    }

    $(".pagination a:first").addClass("active");

    console.log("Created " + i + " pagination pages and added .active class to the first anchor.");
}


// Function for the pagination anchor click.
function paginationClicked() {
    console.log("Pagination button Clicked")
    $(this).parent().parent().children().children().removeClass("active");
    $(this).addClass("active");
    pagSelected = $(this);
    console.log("Number " + pagSelected + " selected");
    paginate(pagSelected);
}


// Function that distributes the list items between all pages.
function paginate(x) {

    // Variable that constitutes the integer at which to start traversing the student array.
    var pagMax = x.text() * studentsPP - 1;
    console.log(pagMax);

    // Variable that constitutes the integer at which to stop traversing the student array.
    var pagMin = pagMax - 9;
    console.log(pagMin);


    if ( x.text() === $(".pagination a.active").text() ) {
        hideStudents();
        for (var i = pagMin ; i < pagMax; i++ ) {
            $(".student-item").eq(i).fadeIn("slow", function(){
                // Animation supposedly complete...
            });
            console.log("CONSTRUCTING STUDENTS");

        }

    }

}

function paginateSearch() {

}

//Constructs a search function.
function constructSearch() {

    searchInput.attr("placeholder", "Search students");
    searchButton.text("Go!");
    container.addClass("student-search");


    $(".page-header").prepend(container);
    container.append(searchInput).append(searchButton);
    console.log(container);
}


// Function that automatically shows the first 10 students in the student list array.
function paginateInitial() {
    for (var i = 0; i < 9; i++) {
        $(".student-item").eq(i).fadeIn("fast", function(){
            // Nothing needed here
        });
    }
}

//May have to be changed (most certainly)
function removePagPages () {
    $(".pagination a").remove();
}


function searchButtonClicked() {
    // this is what was put in the input field.
    var userSearch = searchInput.val();
    console.log('"' + userSearch + '"' + ' was searched');

    //creating an array to store the students
    studentsFoundArr = [];

    // Variable to prevent the students to be hidden if nothing is searched
    var preventHide = false;

    //function to cycle thorugh the student items
    $(".student-item").each(function(){
        var studentName = $(this).find("h3").text();
        var indexSearch = studentName.indexOf(userSearch);

        // if student are not found
        if (indexSearch === -1) {
            console.log("Student NOT found");

        }
            // if search input is empty
            else if (searchInput.val().length === 0) {
                console.log("Nothing was searched");
                preventHide = true;

            }
            // if at least one student is found
            else if (indexSearch > -1) {
                studentsFoundArr.push($(this));
                console.log("Student found and pushing to array");
            }

    });

    if ( preventHide === false) {
        hideStudents();
    } else {
        console.log("Do nothing");
    }

    if (studentsFoundArr.length === 0) {
        $(".student-list").append($("<p>Sorry. No student found. Try again!</p>"));
    }

    else if (studentsFoundArr.length > 0) {

        var newHTML = [];

        for ( var i = 0; i < studentsFoundArr.length; i++) {
            $(".student-list").prepend("<li class='student-item cf'>" + studentsFoundArr[i].html() + "</li>");
        }



    }




    console.log(studentsFoundArr);

}


function restart() {
    calculate$students();
    hideStudents();
    calculatePagesNeeded();
    addPages();
    console.log("Restarted");
}



    // Hide all but the first 10 students when the page loads once the students are counted.
    // Calling this function first since the students are shown on the page initially.
    calculate$students();

    hideStudents();

    calculatePagesNeeded();

    addPages();

    // When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so
    // on. When “6” is clicked 51 through 55 should be shown.
    paginateInitial();


    constructSearch();
    // Using progressive enhancement, add the student search markup as presented in the filters-example.html
    // file to the index.html file.


    //Click function that reacts when an anchor is clicked.
    $(".pagination a").click(paginationClicked);   // Calls function when a pagination anchor is clicked.


    // Add an event listener to the search button.
    searchButton.click(searchButtonClicked);













// Searching should be case insensitive. e.g. a search for “Susan” should return results for “susan” and “Susan".


// Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be displayed in the results.


// Search results should also be paginated. For example, if the search returns more than 10 results, those results should be paginated too.


// Before you submit your project for review, make sure you can check off all of the items on the Student Project Submission Checklist. The
// checklist is designed to help you make sure you’ve met the grading requirements and that your project is complete and ready to be submitted!


// note: A good practice is to check your project for cross browser compatibility. Making sure that it looks and functions correctly in multiple
// (at least three) browsers is an important part of being a top-notch developer. If you want, leave a comment to the project reviewer about
// which browser(s) the project was checked to ensure they are seeing things as you have designed them.
// Some browser options:
// Google Chrome
// Mozilla Firefox
// Internet Explorer/Edge
// Safari


//Did not feel like rmeoving the code all together in case It's needed for further Use

// function searchButtonClicked() {
//     hideStudents();
//     // When the user clicks on the button it should use the text in the search input to filter the results.
//     var searched = searchInput.val();
//     console.log(searched);
//
//
//     //counts how many students that are found
//     var notFoundCount = 0;
//     var foundCount = 0;
//
//     studentsFoundArr = [];
//
//     $(".student-item").each(function() {
//
//         if (searchInput.val().length === 0) {
//             calculate$Students();
//             paginateInitial();
//         }
//
//         var studentName = $(this).find("h3").text();
//         var indexSearch = studentName.indexOf(searched);
//         //If indexOf reaches the conclusion that the string did not match, nothing is found.
//         if ( indexSearch === -1 ) {
//             notFoundCount++;
//             $(this).hide();
//         }
//
//
//         else {
//             $(this).show();
//             foundCount++;
//
//         }
//     });
//
//
//
//     // If nothing is found, start over.
//     if (foundCount === $students) {
//
//     }
//     console.log("Students not found: " + notFoundCount);
//     console.log("Students found: " + foundCount);
//
// }
