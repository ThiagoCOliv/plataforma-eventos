module.exports = (validationResult) => {
    if (validationResult.error) return {
        success: false,
        errors: validationResult.error.details.map(err => err.message)
    };

    return { success: true };
}