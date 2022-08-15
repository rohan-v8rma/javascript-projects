/*
TODO

Add event listener for keyboard to change colors
Add event listener for button click
Detect if shade is too dark, and change hex code text color to white. Or invert the color
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


function palletteChange() {
    let hexAssign, hexInvertAssign;

    for(let box = 1; box <= 5; box++) {
        hexAssign = hexGen();
        hexInvertAssign = hexInvert(hexAssign);
        
        // Changing the background color of the color-box
        document.getElementById("color-box-" + box).style.backgroundColor = hexAssign;

        // Changing the hex code displayed on the color-box
        document.getElementById("hex-" + box).textContent = hexAssign.slice(1, 7); // Removing the hash using slicing

        /*
        ! NOTE that if we tried to change the textContent of id 'color-box-X' directly, the whole 'color-hex-code' div Node would be removed and a simple hex-code would be inserted in its place. 
        
        This would remove its chosen font, the margin/padding applied to the internal div, etc.

        ? This is because if we set the textContent property of a particular element, all child text nodes are replaced by only one new text node.
        */
    };
}

palletteChange();

