const sequelize = require('sequelize');
const ValidatorModel = require('../models/validator')

/**
 * This method create an validator in database
 * @param {Validator} validator 
 */
async function createValidator(validator) {
    try {
        const valid = ValidatorModel.create(validator)
    } catch (err) {
        console.log("Errors in fields: " + err.message);
    }
}

/**
 * This method update missed blocks number in validator database
 * @param {string} security_key 
 * @param {number} missed_blocks 
 */
async function updateMissedBlocksBySecurityKey(security_key,missed_blocks) {
    try{
        const result = await ValidatorModel.findOne({
            where:{
                security_key
            }
        })

        if(result){
            result.missed_blocks = missed_blocks;
            result.save()
        }
    }catch(ex){
        console.log(ex.message)
    }
}

/**
 * This method get all validators in database
 * @returns {Promise<Validator[]>} validatorList
 */
async function getAllValidators() {
    try {
        const valid = await ValidatorModel.findAll({
            attributes: {exclude: ['id','security_key']}
          });
        return valid;
    } catch (err) {
        console.log("Errors in fields: " + err.message);
        throw err
    }
}

/**
 * This method remove validator in database based in securoty_key parameter
 * @param {string} security_key 
 * @returns {Validator} validator
 */
async function removeValidator(security_key){
    try{
        const result = await ValidatorModel.findOne({
            where:{
                security_key
            }
        })
        if (result) {
            const validatorInfo = result;
            result.destroy()
            return validatorInfo;
        }else{
            return null
        }
    }catch(ex){
        console.log(ex.message)
    }
}

module.exports = {
    createValidator,
    getAllValidators,
    removeValidator,
    updateMissedBlocksBySecurityKey
}

