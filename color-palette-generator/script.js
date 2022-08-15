/*
TODO

Add event listener for keyboard to change colors
Add event listener for button click

*/

function hexGen() { // This function returns a string like "#287EDF" which can be used to set the backgroundColor of an element.
    let hex = "#";
    let digit;
    for(let index = 1; index <= 6; index++) {
        digit = Math.floor(Math.random() * 16);
        if( (10 <= digit) && (digit <= 15) ) {
            digit = String.fromCharCode(digit + 65 - 10); // For converting numbers from '10' to '15' to the hexadecimal digits 'A' to 'F'
        }
        hex += digit;
    }
    return hex;
}

let hexAssign;

for(let box = 1; box <= 5; box++) {
    hexAssign = hexGen();
    
    // Changing the background color of the color-box
    document.getElementById("color-box-" + box).style.backgroundColor = hexAssign;

    // Changing the hex code displayed on the color-box
    document.getElementById("hex-" + box).textContent = hexAssign.slice(1, 7); // Removing the hash using slicing
}


