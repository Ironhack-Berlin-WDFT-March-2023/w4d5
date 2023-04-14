// Destructuring

// Destructuring is an easy way of extracting data from arrays and objects

// Objects
const person = {
    name: "Ironhacker",
    age: 25,
    favoriteMusic: "Jazz",
}

// let name = person.name
// let age = person.age
// let favoriteMusic = person.favoriteMusic

// With destructuring its easier:
let { name, age, favoriteMusic } = person

// We can add default values:
// let { name, age, favoriteMusic, country = "Spain" } = person

// We can also change the name of a key:
// const { name: fullName, age, favoriteMusic } = person

// We can also access nested values:
const person2 = {
    name: "Ironhacker",
    age: 34,
    favoriteMusic: "Gabba",
    address: {
        street: "Adalbertstr.",
        number: 120,
        city: "Berlin"
    }
}

// let {
//     name,
//     age,
//     favoriteMusic,
//     address: { street, number, city }
// } = person2
// console.log(name, age, street)


// Challenge 1: 
// - Extract make and year from the car
// - Extract fuel and hp from the car

const car = {
	make: "Volvo",
	year: 1995,
	engine: {
		fuel: "petrol",
		hp: 80
	}
}

const { make, year } = car
const { engine: { fuel, hp } } = car


// Challenge 2: Write a function studentMessage() that gets a student object and returns this string using object destructuring:
// "Hello, my name is <firstName> <lastName>, I'm from <city> and my favorite football team is <favoriteFootballTeam>!"

const student = {
    name: {
        firstName: "Ana",
        lastName: "Marino"
    },
    isStudent: true,
    favoriteFootballTeam: "FC Barcelona",
    hometown: {
        city: "Buenos Aires",
        country: "Argentina"
    }
}

function studentMessage(student) {
    const { name: { firstName, lastName }, favoriteFootballTeam, hometown: { city }} = student

    return `Hello, my name is ${firstName} ${lastName}, I'm from ${city} and my favorite football team is ${favoriteFootballTeam}!`
}

console.log(studentMessage(student))

// You can also destructure the parameters of a function: 
function studentMessage2({ favoriteFootballTeam }) {
    return favoriteFootballTeam
}

console.log(studentMessage2(student))


// Array destructuring

const campuses = ["madrid", "barcelona", "miami"]

// This is the way we did it before:
// const firstCampus = campuses[0]

// But there's another way:
// const [firstCampus, secondCampus, thirdCampus] = campuses

// Get only the third one:
// const [, , thirdCampus] = campuses

// Add a default value for one element:
const [firstCampus, secondCampus, thirdCampus, fourthCampus = "paris"] = campuses

// If you have nested values, you can use another pair of square brackets to destructure them:
const europeanCampuses = [["madrid", "es"], ["paris", "fr"]]

const [[campus1, country1], [campus2, country2]] = europeanCampuses
console.log(campus1, country1, campus2, country2)

// We can also destructure from a string
const bestDev = "antonio"
const [firstChar] = bestDev
console.log(firstChar)

// Challenge 3
// What does the console log?

// const [a, b] = [1]
// console.log(a * b) // => undefined

// const [a, b = 1] = [2]
// console.log(a * b) // => 2

// let [a, b = 2, c, d = 1] = [3, 4]
// console.log(a, b, c, d) // => 3, 4, undefined, 1


// Challenge 4

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Extract the first two numbers
const [zero, one] = numbers

// Extract the third and the fifth number
const [, , , third, , fifth] = numbers

// Extract all numbers but the first one
// const greaterThan0 = numbers.slice(1)
const [, ...greaterThan0] = numbers

// -----------------------------------------------------------------------------

// Spread operator
// The spread operator allows iterables (arrays, objects, strings) to be expanded into single arguments/elements
// In simple words: The spread operator unpacks elements of an array.

// We used it before to copy an array:
const numbers1 = [1, 2, 3]
const copyOfNumbers = [...numbers1]

// We can also add two arrays together:
const numbers2 = [4, 5, 6]
const allNumbers = [...numbers1, ...numbers2]
console.log(allNumbers)
// We can also do it with concat: numbers1.concat(numbers2)

// If you use Math.max(), you also need the spread-operator:
console.log(Math.max(...allNumbers))


// Spread as the rest operator
// The spread operator as a parameter in a function represents an infinite number of arguments as an array

function sum(...numbers) {
    return numbers.reduce((acc, val) => {
        return acc + val
    })
}

const allNumbersSum = sum(allNumbers)
console.log(allNumbersSum)

// You can also use the arguments object, which represents all arguments

// You can also choose to get the first two parameters as variables and then use the rest operator

function sum2(first, second, ...numbers) {
    console.log(numbers)
}

sum2(allNumbers)

// Challenge 5
// Create a function that recieves any number of strings as arguments and return the longest string

function longestString(...strings) {
    let longest = ""
    
    for (let i = 0; i < strings.length; i++) {
        if (strings[i].length > longest.length) {
            longest = strings[i]
        }
    }

    return longest
}

// Using arguments:

function longestString2() {
    let longest = ""

    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i].length > longest.length) {
            longest = arguments[i]
        }
    }

    return longest
}


// Challenge 6: Using the spread operator, return the string upperCased and reversed

const str = "Hello World!"

const reversedUppercasedStr = [...str.toUpperCase()].reverse().join()
