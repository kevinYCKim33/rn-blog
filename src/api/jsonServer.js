import axios from "axios";

// Steps for this app to get working

/*
1. cd into jsonserver
2. Terminal 1: run npm db
3. Terminal 2: run npm tunnel
4. copy and pase the line that looks something like this:
    http://4045561311fa.ngrok.io
    ^ ^ this will change every time you run npm tunnel
    ^ ^ this will also expire in 8 hrs
    ^ ^ paid account lets me do kevin123.ngrok.io but comes with headache
5. paste whatever the above value may be into the baseURL
6. cd into blog directory
7. expo r -c OR npm start
*/

export default axios.create({
  baseURL: "http://a906e562cfc8.ngrok.io",
});
