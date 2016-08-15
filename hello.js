var increment = 0;
var insertIncrement = 100;

for (var i = 0; i < insertIncrement; i++) {
    increment += 5;
    var print = increment * 2;
}

document.innerHTML = print;
