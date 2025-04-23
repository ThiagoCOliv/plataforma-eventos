module.exports = (length) => {
    let number = '';
    for (let i = 0; i < length; i++) number += Math.floor(Math.random() * 10).toString();
    
    return parseInt(number);
};