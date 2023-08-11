//This file will hold all common utility methods/functions

//Check whether given input is string or not
function isString(x) {
    return Object.prototype.toString.call(x) === "[object String]"
}

export {
    isString
}