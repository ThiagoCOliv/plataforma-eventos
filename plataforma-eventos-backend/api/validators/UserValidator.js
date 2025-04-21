const validateCreate = (userData) => {
    const passwordMatch = validatePasswordMatch(userData.password, userData.confirmPassword);
    if (passwordMatch.error) return passwordMatch;
    
    return true;
};

const validatePasswordMatch = (password, confirmPassword) => password === confirmPassword ? true : { error: 'Password mismatch!' };

module.exports = {
    validateCreate
}