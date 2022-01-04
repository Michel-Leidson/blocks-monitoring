const BlocksRepository = require('../repository/BlocksRepository');

async function test() {


    let blockCount = await BlocksRepository.getCountBlocksByValidatorId(8);
    console.log("Block Count", blockCount)

}

test()