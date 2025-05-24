module.exports = (length) => {
    let number = '';
    while (number.length < length) number += Math.floor(Math.random() * 10).toString();
    
    return parseInt(number);
};