/*
TODO

Function for adding a color box

*/

let numOfBoxes = 5;

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

function hexInvert(hexCode) {
    let invertedHexCode = "#";
    let invertDigit;
  
    for(let digit = 1; digit <= 6; digit++) {
        if ( ( 65 <= hexCode.charCodeAt(digit) ) && ( hexCode.charCodeAt(digit) <= 70 ) ) {
            invertDigit = 15 - ( (hexCode[digit]).charCodeAt(0) - 65 + 10 );
        }
        else {
            invertDigit = 15 - parseInt(hexCode[digit]);
            
            if (invertDigit >= 10) {
              invertDigit = String.fromCharCode(invertDigit + 65 - 10);
            };          
        }
  
        invertedHexCode += invertDigit;
  
    }
    return invertedHexCode;
  }

// Function for checking whether the color is too dark for black text to be visible.
function darknessTest(hexCode) {
    let sum = 0;

    for(let digit = 1; digit <= 6; digit++) {

        if ( ( 65 <= hexCode.charCodeAt(digit) ) && ( hexCode.charCodeAt(digit) <= 70 ) ) {
            sum += ( 16 ** (digit % 2) ) * ( hexCode[digit].charCodeAt(0) - 65 + 10 );
        }
        else {
            sum += ( 16 ** (digit % 2) ) *  parseInt(hexCode[digit]);
        }
    }
    if(sum > 250) { //Since the sum of the digits of #FFFFFF (white) is 255+255+255 = 765 and the sum of the digits of #000000 is 0, we keep an optimal number of 250 as the threshold.
        return 0;
    }
    else {
        return 1; 
    }
}

// Function and Array which tells us whether to keep the color of a particular div static or not.

let isBoxColorLocked = Array(numOfBoxes).fill(false); 
// 0 indicates element won't be kept static. 
// 1 indicates element will be kept static.


function palletteChange() {
    let hexAssign;
    let div;
    let fontColor;    

    for(let boxIndex = 1; boxIndex <= numOfBoxes; boxIndex++) {
        
        if(isBoxColorLocked[boxIndex - 1]) {
            continue;
        }

        hexAssign = hexGen();
        hexInvertAssign = hexInvert(hexAssign);
        
        div = document.getElementById("color-box-" + boxIndex);

        // Changing the background color of the color-box
        div.style.backgroundColor = hexAssign;

        div = document.getElementById("hex-" + boxIndex);

        // Changing the hex code displayed on the color-box
        div.textContent = hexAssign.slice(1, 7); // Removing the hash using slicing

        /*
        ! NOTE that if we tried to change the textContent of id 'color-box-X' directly, the whole 'color-hex-code' div Node would be removed and a simple hex-code would be inserted in its place. 
        
        This would remove its chosen font, the margin/padding applied to the internal div, etc.

        ? This is because if we set the textContent property of a particular element, all child text nodes are replaced by only one new text node.
        */

        // TODO : Can steps be reduced here
        if(darknessTest(hexAssign)) {
            fontColor = "white";
        }
        else {
            fontColor = "black";
        }      

        div = document.getElementById("color-box-" + boxIndex);
        div.style.color = fontColor;

        // We have to change colors separately for the icons, because font properties of text inside buttons i s

        div = document.getElementById("lock-" + boxIndex);
        div.style.color = fontColor;

        div = document.getElementById("copy-" + boxIndex);
        div.style.color = fontColor;

    };
}

palletteChange();

document.addEventListener("keydown", function(event) {
    if( event.key = " " ) {
        console.log("Space bar pressed.");
        palletteChange();
    }
})

// for-loop for adding event listeners for copy-button clicks. The event is handled by writing the hex-code of the visible color to the user's clipboard.

let hexCode;

for(let boxIndex = 1; boxIndex <= numOfBoxes; boxIndex++) {
    
    // We have declared the copyButton variable inside the for-loop, so that each iteration of the for-loop has a separate copyButton variable, and each box has a separate variable, (pointing to that box in the DOM) in the lexical environment of its handler function

    const copyButton = document.getElementById("copy-" + boxIndex);

    copyButton.addEventListener("click", function() {
        hexCode = document.getElementById("hex-"+boxIndex).innerText;
        navigator.clipboard.writeText(hexCode);
    })
}

// for-loop for adding event listeners for lock-button clicks. The event is handled by 

for(let boxIndex = 1; boxIndex <= numOfBoxes; boxIndex++) {
    
    // We have declared the lockButton variable inside the for-loop, so that each iteration of the for-loop has a separate lockButton variable, and the event listener of each box has a separate variable in the lexical environment of its handler function `LockUnlock`
    const lockButton = document.getElementById("lock-" + boxIndex);    

    function LockUnlock() {
        
        // const lockButton = document.getElementById("lock-" + box);

        lockButton.blur(); // Remove focus after click
        
        // Inverting whether the box was color locked or not
        isBoxColorLocked[boxIndex - 1] = !(isBoxColorLocked[boxIndex - 1]);

        if (isBoxColorLocked[boxIndex - 1]) { // Box is color locked so lock button should be visible when not hovering on the div as well.
    
            lockButton.style.visibility = "visible";

        }
        else { 
                        
            lockButton.style.removeProperty("visibility"); //? Removed the property set in the above IF-block

        }
        
    }

    lockButton.addEventListener("click", LockUnlock);
}
