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

var container = $(".page"); // The container that surrounds everything.

var pagination = $("<div class='pagination'></div>"); // The pagination container.

var $studentItem = $(".student-item");


//************* FUNCTIONS *************//


// calculate the amount of jquery student items per page shown.
function calculate$students() {
    $(".student-item:visible").each(function(){
        $students++;
    });
    console.log("Calculated amount of student-items shown. There are " + $students + " of them.")
}


// Calculates the amount of pagination pages needed based on the number of students.
function calculatePagesNeeded() {
    pagesNeeded = Math.ceil($students / studentsPP);
    console.log("You need " + pagesNeeded  + " pages for the pagination");
}


//Hides all jquery students on the page.
function hideStudents() {
    $studentItem.each(function() {
        $(this).hide();
    });
    console.log("Hiding ALL jquery students.");
}
// Calculates the jquery .student-items that are exclusively visible on the page.


// Appending the right number of Pagination Pages to the bottom of the page.
function addPages() {
    container.append(pagination); // Initially placing the pagination withing the container.

    // For each page that is needed, append a pagination anchor to the pagination contiainer.
    for ( i = 1; i < pagesNeeded + 1; i++ ) {   // I am adding one to both variables since I don't wish to have the pagination start at 0.
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
}


// Hide all but the first 10 students when the page loads once the students are counted.
// Calling this function first since the students are shown on the page initially.
    calculate$students();
    hideStudents();
    calculatePagesNeeded();
    addPages();


    //Click function that reacts when an anchor is clicked.
    $(".pagination a").click(paginationClicked);   // Calls function when a pagination anchor is clicked.



    // When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so
    // on. When “6” is clicked 51 through 55 should be shown.








// Using progressive enhancement, add the student search markup as presented in the filters-example.html file to the index.html file.


// Add an event listener to the search button. When the user clicks on the button it should use the text in the search input to filter the results.
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
