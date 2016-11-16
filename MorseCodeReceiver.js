/*
 * Morse Code receiver app information:
 *
 * Function: messageFinished(): stops the capturing process
 *
 *	 You can call this function to let the app know that the
 *	 end-of-transmission signal has been received.
 *
 * -------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *	 This will be a textarea element where you can display
 *	 the recieved message for the user.
 *
 * -------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *	 This is a button element.  When clicked this should
 *	 cause your app to reset its state and begin recieving
 *	 a new message.
 *
 */


// ADD YOUR ADDITIONAL FUNCTIONS AND GLOBAL VARIABLES HERE
var counter = 0;
var last,chara,word;
/*
 * This function is called once per unit of time with camera image data.
 *
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *		 Each pixel is representing by four consecutive integer values for
 *		 the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *		 instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is
 *		 an 'on' (blue) signal.
 */

// Curate: The function Curate uses .length to determinate the length of the array, and processes the array from the first value. The array taken would be a multiple of four array.
// For every three values in the array, the function will splice the forth one, which would be the Alpha, which does not have any impact on colour.
// It then returns the spliced array, which should be a multiple of three.


// Count: Count initially takes the input of the multiple of three array, then looks at a "set" (three arrays representing Red, Green and Blue)
// The highest of the set then adds one to the RGB counter. The function then looks at the next set of arrays, and repeats.
// At the end, the function looks at the highest count, then returns FALSE if red was highest, TRUE if blue was highest or ERROR if green was highest.
function curate(array)
{
	var length = array.length
	var n = 0
	var arrayPositionSplice = 0
	for(var i=0; i<length; i++)
	{
		if(n===3)
		{
			array.splice(i-arrayPositionSplice,1) //-arrayPositionSplice is done because after splicing an array, the ones afterwards gets shifted down an index.
			n=0
			arrayPositionSplice++
			
		}
		else
		{
			n=n+1
			
		}
		
	}
	return array
	
}

function count(input)
{
	var length = input.length
	var arraySets = length/3
	var red = 0
	var green = 0
	var blue = 0
	var redCount = 0
	var greenCount = 0
	var blueCount = 0
	var n = 0
	for(var i = 0;i < arraySets;i++)
	{
		red=input[n]
		green=input[n+1]
		blue=input[n+2]
		if ((red > green) && (red > blue)){redCount++}
		else if ((green > red) && (green > blue)){greenCount++}
		else if ((blue > green) && (blue > red)){blueCount++}
		n=n+3
	}
	if ((redCount > greenCount) && (redCount > blueCount)){return false}
	else if ((greenCount > redCount) && (greenCount > blueCount)){return "error"}  //may need to ignore the condition, and simply return as error in case of white paper,etc.
	else if ((blueCount > greenCount) && (blueCount > redCount)){return true}
}


function decodeCameraImage(data)
{
	var trimmedArray=curate(data)
	

	return count(trimmedArray);
}

function signalConverting(data)
{
	if data === true
	{
		data = "on"
	}
	else
	{
		data = "off"
	}
	if data === last
	{
		counter++;
	}
	else
	{
		if (counter < 3 && last ==="on")
		{
			chara += '.'
			last = data
		}
		else if (counter >= 3 && last === "on") {
			chara += '_'
			last = data
		}
		else if (counter<3 && last === "off")
		{
			counter = 0
			last = data
		}
		else if ((counter >=3 && counter < 6) && last === "off")
		{
			//search at lookup table
		}
		else if(counter >= 7 && last === 'off')
		{
			word += ' '
			last = data
		}
		counter = 0
	}
}
