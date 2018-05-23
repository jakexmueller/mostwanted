/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
//debugger;
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  
  switch(searchType){
    case 'yes':
    let filteredPerson = searchByName(people);
		console.log(filteredPerson);
		mainMenu (filteredPerson[0], people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByName(people){
  var enteredFirstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var enteredLastName = promptFor("What is the person's last name?", chars).toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.firstName.toLowerCase() === enteredFirstName && el.lastName.toLowerCase() === enteredLastName) {
      return true;
	}
  });
  console.log(newArray);
  return newArray;
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
		filteredPeople = searchByEyeColor(people);
		break;
	case "gender":
		filteredPeople = searchByGender(people);
		break;
	case "age":
		filteredPeople = searchByAge(people);
		break;
	case "occupation":
		filteredPeople = searchByOccupation(people);
		break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  
	if(filteredPeople.length > 1){
		alert(filteredPeople.length + " " + "found. Narrow the options by choosing another trait");
		searchByTraits(filteredPeople);
	}
	else if(filteredPeople.length === 0){
		alert("No matches found, Try again!");
		searchByTraits(filteredPeople);
	}
	else {
		//alert("Rigo is a stud");	
		let foundPerson = filteredPeople[0];
		mainMenu(foundPerson, people);
	}
}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person(in inches)?");
  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });
  return newArray;
}


function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh (in pounds)?");
  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });
  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What color are the persons' eyes?");
  let newArray = people.filter(function (el) {
    if(el.eyeColor === userInputEyeColor) {
      return true;
    }
  });
  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What is the persons' gender (if they choose to identify)?");
  let newArray = people.filter(function (el) {
    if(el.gender === userInputGender) {
      return true;
    }
  });
  return newArray;
}

function searchByAge(people) {
  let userInputAge = prompt("What is the persons' date of birth(m/dd/yyyy)?");
  let newArray = people.filter(function (el) {
    if(el.dob === userInputAge) {
      return true;
    }
  });
  return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the persons' occupation?");
  let newArray = people.filter(function (el) {
    if(el.occupation === userInputOccupation) {
      return true;
    }
  });
  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people,){
	let personalInfo;

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
	console.log(person)
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info": 
		personalInfo = displayPerson(person);
    break;
    case "family":
		personalInfo = displayFamily(person, people);
    break;
    case "descendants":
		let listOfDescendants = getDescendants(person, people);
		personalInfo = displayPeople(listOfDescendants);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date Of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";

  alert(personInfo);
}

function displayDescendants (person, people){
	let children = getDescendants(person, people);
	alert(people.map(function(person){
		return person.firstName + " " + person.lastName;
	}).join("\n"));
}
	
	
function getDescendants(person, people){
	let descendants = getChildren(person, people);

	for(let i = 0; i < descendants.length; i++){
		let grandchildren = getDescendants (descendants[i], people);
		descendants = descendants.concat(grandchildren);		
	}
	return descendants;
}

function displayFamily(person, people){
	if(person.currentSpouse != null){
		let spouse = getSpouse(person, people);
		for (let i = 0; i < spouse.length; i++){
			var familyOfPerson = "Spouse: " + spouse[i].firstName + " " + spouse[i].lastName + "\n";	
		}
	}
	else {
		var familyOfPerson = "No spouse" + "\n";
	}	
	let parents = getParents(person, people);
	
		for (let i=0; i < parents.length; i++){ 
			familyOfPerson += "Parent: " + parents[i].firstName + " " + parents[i].lastName + "\n";
		}
		let children = getChildren(person, people);
	
		for (let i=0; i < children.length; i++){ 
			familyOfPerson += "Children: " + children[i].firstName + " " + children[i].lastName + "\n";
		}
	let siblings = getSiblings (person, people);
		for (let i=0; i< siblings.length; i++) {
			familyOfPerson += "Siblings: " + siblings[i].firstName + " " + siblings[i].lastName + "\n";
		}
	let infoArray =[]
	for (i=0; i < familyOfPerson.length; i++){
		infoArray.push(familyOfPerson);
	}
	alert(familyOfPerson);
}

function getSpouse(person, people) {
	console.log(person);
	let spouse = people.filter(function (el) {
		if(person.currentSpouse === el.id) {
			console.log(person.currentSpouse);
			return true;
		}	
 });
  return spouse;

}

function getParents (person, people){
	console.log(person);
	let parentsArray = people.filter(function (el) {
		if(person.parents[0] === el.id || person.parents[1] === el.id) {
			console.log(el.id);
			return true;
		}
  });
  return parentsArray;
}

function getChildren(person, people) {
	console.log(person);
	let childrenArray = people.filter(function (el) {
		if(el.parents[0] === person.id || el.parents[1] === person.id) {
			console.log(el.id);
			return true;
		}
  });
  return childrenArray;

}

function getSiblings(person, people){
	let newArray = people.filter (function (el) {
		for (let i = 0; i < people.length; i++){
		if(el.parents[i] == person.parents){
				console.log(el.id);
				return true;
			}
		}	
	});
	return newArray;	
}
	
// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
