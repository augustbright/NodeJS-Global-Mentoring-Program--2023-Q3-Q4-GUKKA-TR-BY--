/** 
@param {number} from - min number
@param {number} to - max number
@return {number} - random number
*/

function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

console.log(`Random between 5 and 10 is ${getRandomNumber(5, 10)}`);