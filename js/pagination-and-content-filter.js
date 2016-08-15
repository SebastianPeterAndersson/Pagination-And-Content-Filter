// Draft 3


// Use the filters-example.html file to guide your decision making. Using progressive enhancement, your work should affect the index.html file.
// Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number
// of links to the bottom of the page.

//************* GLOBAL VARIABLES *************//

// The 'PP' in studentsPerPage stands for 'studentsPerPage'
var studentsPP = 10; // Only 10 students should be shown per pagination page.

var pagesNeeded;

var pagPages;

var $students = 0;


//************* FUNCTIONS *************//

// calculate the amount of jquery student items per page shown.

function hideStudents() {
    $(".student-list").each(function() {
        $(this).hide();
    });
    console.log("Hiding ALL jquery students.");
}
// Calculates the jquery .student-items that are exclusively visible on the page.

function calculate$students() {
    $(".student-item:visible").each(function(){
        $students++;
    });
    console.log("Calculated amount of student-items shown. There are " + $students + " of them.")
}

function calculatePagesNeeded() {
    pagesNeeded = Math.ceil($students / studentsPP);
    console.log("You need " + pagesNeeded  + " pages for the pagination");
}

function addPages() {

}


// Hide all but the first 10 students when the page loads once the students are counted.
    calculate$students(); // Calling this function first since the students are shown on the page initially.
    hideStudents();
    calculatePagesNeeded();



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
