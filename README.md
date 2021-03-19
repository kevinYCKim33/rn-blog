// Steps for this app to get working

/\*

1. cd into jsonserver
2. Terminal 1: run npm db
3. Terminal 2: run npm tunnel
4. copy and pase the line that looks something like this:
   http://4045561311fa.ngrok.io
   ^ ^ this will change every time you run npm tunnel
5. paste whatever the above value may be into the baseURL
6. cd into blog directory
7. expo r -c OR npm start
   \*/

export default axios.create({
baseURL: 'http://4045561311fa.ngrok.io'
});

jsonserver:

db.json

{
"blogposts": [
{
"title": "Third post creation",
"content": "Asdofjl",
"id": 3
},
{
"title": "Updated blog post #4",
"content": "Alskdjlkdf",
"id": 4
},
{
"title": "Anustart",
"content": "Arrested development is kind of overrated? ",
"id": 5
},
{
"title": "Abc",
"content": "Sfef",
"id": 6
}
]
}

package.json

{
"name": "jsonserver",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"db": "json-server -w db.json",
"tunnel": "ngrok http 3000"
},
"author": "",
"license": "ISC",
"dependencies": {
"json-server": "^0.16.3",
"ngrok": "^3.4.1"
}
}
