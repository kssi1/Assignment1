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
function decodeCameraImage(data)
{
	// ADD YOUR CODE HERE

	return false;
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
