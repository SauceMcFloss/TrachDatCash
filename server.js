// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const cors = require('cors');
const path = require("path");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require('shortid');

// Load input validation
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");

// Load config keys
const keys = require("./config/keys");

// Load database URI from keys file
const db = require("./config/keys").mongoURI;

// Load models
let Expense = require('./models/expense');
let User = require('./models/user');

// Instantiate Express variable
const app = express();

// Define route handler
const expenseRoutes = express.Router();

// Bodyparser middleware
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));
	
// Define port to deploy through
const PORT = process.env.PORT || 4000; // "process.env.PORT" is Heroku's port if we're deploying there, then 4000 is a custom chosen port for dev testing

// Passport middleware
app.use(passport.initialize());

// Load Passport config
require("./config/passport")(passport);

// ----------------------------------------------------------------------------------------
// ---------------------------------------- ROUTES ----------------------------------------
// ----------------------------------------------------------------------------------------

// @route POST /expenses/getAllExpenses
// @desc Return all expenses for specified user
expenseRoutes.route("/getAllExpenses").post(function(req, res){
	const usersId = req.body.id.toString();
	// Find expenses by specified user
	Expense.find({userId: usersId}, function(err, expenses){
		if(err){
			console.log(err);
		}
		else{
			res.json(expenses);
		}
	});
});

// @route POST /expenses/category
// @desc Return all expenses for specified category
expenseRoutes.post("/category", (req, res, next) => {
	const usersId = req.body.id.toString();
	const usersCategory = req.body.newCategory;
	const usersYear = req.body.newYear;
	// Find expenses by specified user, category, and year
	Expense.find({userId: usersId, category: usersCategory, year: usersYear}, function(err, expenses){
		if(err){
			console.log(err);
		}
		else{
			res.json(expenses);
		}
	});
});

// @route POST /expenses/month
// @desc Return all expenses for specified month
expenseRoutes.route("/month").post(function(req, res){
	const usersId = req.body.id.toString();
	const usersMonth = req.body.newMonth;
	const usersYear = req.body.newYear;
	// Find expenses by specified user, month, and year
	Expense.find({userId: usersId, month: usersMonth, year: usersYear}, function(err, expenses){
		if(err){
			console.log(err);
		}
		else{
			res.json(expenses);
		}
	});
});

// @route POST /expenses/codeMount
// @desc Mount group code page
expenseRoutes.post("/codeMount", (req, res, next) => {
	const usersId = req.body.id.toString();
	// Find one user by specified id
	User.findOne({ _id: usersId }).then(user => {
		if(user){
			return res.json(user);
		}
		else{
			console.log("Error");
		}
	});
});

// @route POST /expenses/code/:thisCode
// @desc Return all expenses with specified group code
expenseRoutes.post("/code/:thisCode", (req, res, next) => {
	const thisGroupCode = req.params.thisCode;
	// Find all expenses with specified group code
	Expense.find({groupCode: thisGroupCode}, function(err, expenses){
		if(err){
			console.log(err);
		}
		else{
			res.json(expenses);
		}
	});
});

// @route POST /expenses/:id
// @desc Return specific expense from database
expenseRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
	// Find expense by the specified id
    Expense.findById(id, function(err, expense){
        res.json(expense);
    });
});

// @route POST /expenses/add
// @desc Add new expense
expenseRoutes.route('/add').post(function(req, res){
	// Define new expense by the data in req body
    let expense = new Expense(req.body);
    expense.save()
        .then(expense => {
            res.status(200).json({'expense': 'expense added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new expense failed');
        });
});

// @route POST /expenses/update/:id
// @desc Update expense with specified id
expenseRoutes.route('/update/:id').post(function(req, res){
	// Find expense by the specified id
    Expense.findById(req.params.id, function(err, expense){
		if(!expense){
            res.status(404).send("data is not found");
		}
        else{
			// Save new data over old data for specified expense
            expense.description = req.body.description;
            expense.amount = req.body.amount;
            expense.category = req.body.category;
            expense.month = req.body.month;
            expense.day = req.body.day;
            expense.year = req.body.year;
            expense.groupCode = req.body.groupCode;
            expense.save().then(expense => {
                res.json('Expense updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
		}
    });
});

// @route DELETE /expenses/delete/:id
// @desc Delete expense with specified id
expenseRoutes.delete("/delete/:id", (req, res, next) => {
	const id = req.params.id;
	Expense.findOneAndDelete({_id: id}, function(err, expenses){
		if(err){
			console.log(err);
		} else {
			res.json({
			success: id});
		}
	});
});

// @route POST /expenses/register
// @desc Register user
expenseRoutes.post("/register", (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	// Find user by specified email
	User.findOne({ email: req.body.email }).then(user => {
		if(user){
			return res.status(400).json({ email: "Email already exists" });
		}
		else{
			// Define new user's payload
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				groupCode: shortid.generate(),
				budget: "100",
				password: req.body.password
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
  });
});

// @route POST /expenses/login
// @desc Login user and return JWT token
expenseRoutes.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);

	// Check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	// Define constants from req body
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		if(!user){
			return res
				.status(404)
				.json({ emailnotfound: "Email not found" });
		}

		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if(isMatch){
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name,
					groupCode: user.groupCode,
					budget: user.budget
				};

				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			}
			else {
				return res
					.status(400)
					.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
});

// @route POST /expenses/updateBudget/:id
// @desc Update user's budget with specified id
expenseRoutes.route('/updateBudget/:id').post(function(req, res){
	// Find user by the specified id
    User.findById(req.params.id, function(err, user){
		if(!user){
            res.status(404).send("data is not found");
		}
        else{
			// Save new data over old data for specified user
            user.budget = req.body.budget;
            user.save().then(user => {
                res.json('User budget updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
		}
    });
});

// Define standard path extension for route handler
app.use('/expenses', expenseRoutes);

// ----------------------------------------------------------------------------------------
// -------------------------------------- END ROUTES --------------------------------------
// ----------------------------------------------------------------------------------------

// Deployment
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function(){
    console.log("Server is running on Port: " + PORT);
});