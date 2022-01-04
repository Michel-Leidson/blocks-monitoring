const BlocksRepository = require('../repository/BlocksRepository');

async function test() {
    const blockInfo = {
        height: 78679,
        validator_id: 2,
        signed_in: new Date().toISOString()
    }

    //await BlocksRepository.createBlock(blockInfo);

    let blocks = await BlocksRepository.getAllBlocksByValidatorId(2);

    blocks.map(block=>{
        console.log("Block Height", block.height)
    })
}

test()