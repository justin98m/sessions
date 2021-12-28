
//followed tutorial on
//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
//tell express where static files are
app.use(express.static(__dirname + '/public'));
const port = 8080;
//Prebuilt SQL Functions
//const con = require('./connect.js');
//const start= require('./runsql.js')

nunjucks.configure('./public/views', {
	autoescape: true,
	express: app
});
const oneDay = 1000 * 60 *6  *24
app.use(sessions({
	secret : "RandomstringthatD0esntMatterforNowiafdikshjfs231",
	saveUninitialized: true,
	cookie: {maxAge: oneDay},
	resave: false
}))
app.use(cookieParser())

const username = "justin98m"
const password = "password"
var session;
app.get('/',(req,res) => {
	session =req.session;
	if(session.userid){
		res.render('home.html',data={
			layout: 'layout.html',
			css : 'home.css',
			username: session.userid
		})
	}
	else{
		res.render('login.html',	data = {
			layout:'layout.html',
			css: 'home.css'
		})
	}
})

//Getting Post Data
app.post('/login',(req,res)=>{
	credentials = {
		usernameinput: req.body.username,
		passwordinput: req.body.password
	}

	if(credentials.usernameinput == username && credentials.passwordinput == password){
		session = req.session
		session.userid = credentials.usernameinput
		console.log(session)
		res.render('home.html', data = {
			layout: 'layout.html',
			css: 'home.css',
			username: credentials.usernameinput
		})
	}
	else{
		res.render('login.html',data = {
			layout:'layout.html',
			css: 'home.css',
			message: "Invalid Credentials"
		})
	}
})
app.get('/createAccount',(req,res)=>{
	res.render('createAccount.html', data={
		layout:'layout.html',
		css: 'home.css'
	})
	//table format
	//username
	//password
	//auto incremented id
})
app.get('/logout', (req,res)=>{
	req.session.destroy()
	res.redirect('/')
})

	/* *****SQL CODE FOR YOU********
	res.render('submit.html', data)


	let query = "insert into mern (vice,age), ("+vice+","+age+") ";

	//First time in callback hell, gotta love it
	start.runsql(query,(result,flag)=>{
		if(flag)
			console.error("error: ", result);
		else
			console.log(result)

	})*/
app.listen(port,() => {
})
