const ValidatorRepository = require('../repository/ValidatorRepository');

/**
 * This method create an Validator calling method createValidator of ValidatorRepository
 * @param { Validator } validator
 */
async function createValidator(validator) {
    try {
        const security_key = await generateSecurityKey(32);
        validator = {
            ...validator,
            security_key
        }
        const result = await ValidatorRepository.createValidator(validator);
        return validator
    } catch (ex) {
        console.log(ex.message)
    }
}
/**
 * This method call method getAllValidators ValidatorRepository
 * @returns {Promise<Validator[]>} validatorList
 */
async function getAllValidators() {
    try {
        const result = await ValidatorRepository.getAllValidators();
        return result
    } catch {
        console.log("Error in ValidatorService -> getAllValidators")
    }
}
/**
 * This method remove validator calling method removeValidator of ValidatorRepository
 * @param {string} security_key 
 * @returns {Promise<string>} validatorName
 */
async function removeValidator(security_key) {
    try {
        const result = await ValidatorRepository.removeValidator(security_key);
        if (result) {
            return result
        } else {
            return null
        }
    } catch (ex) {

    }
}

/**
 * This method update missed blocks in validator calling method updateMissedBlocksBySecurityKey ValidatorRepository
 * @param {string} security_key
 * @param {number} missed_blocks
 *
 */
async function updateMissedBlocksBySecurityKey(security_key,missed_blocks){
    try{
        const result = await ValidatorRepository.updateMissedBlocksBySecurityKey(security_key,missed_blocks)
    }catch(ex){
        console.log(ex.message)
    }
}

/**
 * This method generate an security key
 * @param {number} numberOfCaracters
 * @returns {string}
 */ 
async function generateSecurityKey(numberOfCaracters) {
    let caracters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let generatedKey = '';

    for (let i = 0; i <= numberOfCaracters; i++) {
        let isUpperCase = Math.floor(Math.random() * 10)
        let numberRandom = Math.floor(Math.random() * caracters.length)
        if (isUpperCase < 5) {
            let carac = `${caracters[numberRandom]}`.toUpperCase();
            generatedKey += carac;
        }else{
            let carac = `${caracters[numberRandom]}`;
            generatedKey += carac;
        }

    }
    generatedKey = `${generatedKey.substring(0,8)}-${generatedKey.substring(8,16)}-${generatedKey.substring(16,24)}-${generatedKey.substring(24,32)}`

    return generatedKey
}

module.exports = {
    createValidator,
    getAllValidators,
    removeValidator,
    updateMissedBlocksBySecurityKey
}