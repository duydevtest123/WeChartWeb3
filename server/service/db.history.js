var TokenHistory = require('../models/token_history');
const UtilsAddresses = require('../../utils/addresses');

async function findPairs( contract ){
    console.log("db history findPairs")
    let documents = await TokenHistory.find(
        { dependantToken: UtilsAddresses.toCheckSum(contract) }
    ).lean().exec();
    if(!documents.length) return null;
    return documents;
}
async function findPairsMultiple( contracts ){
    for( let i = 0; i < contracts.length; i++ ){
        contracts[i] = UtilsAddresses.toCheckSum(contracts[i]);
    }
    console.log("db history findPairsMultiple")
    let documents = await TokenHistory.find(
        { dependantToken: { $in: contracts } }
    ).lean().exec();
    if(!documents.length) return null;
    return documents;
}
async function findPairsWithFilters( filter ){
    console.log("db history findPairsWithFilters")
    return await TokenHistory.find(filter).lean().exec();
}
async function findTokensWithMultipleRouters( allowedRouters ){
    console.log("db history findTokensWithMultipleRouters")
    let routers = await TokenHistory.aggregate([
            {
                $match: { router: { $in: allowedRouters } }
            },
            { 
                $group: { 
                    _id: { router: "$router"},
                    count: { "$sum": 1 },
                    docs: { $push: "$$ROOT" } 
                }
            }
        ],
        {allowDiskUse: true}       // For faster processing if set is larger
    ).exec()
    return routers;
}
async function findAllowedRoutersPairs( allowedRouters, tokens ){
    let match = { router: { $in: allowedRouters } };
    if( tokens ){
        match['token0.contract'] = { $in: tokens };
        match['token1.contract'] = { $in: tokens };
    }
    console.log("db history findAllowedRoutersPairs")
    return await TokenHistory.find(match)
    .select({ 'token0.contract': 1, 'token1.contract': 1, pair: 1, router: 1, reserve0: 1, reserve1: 1 })
    .lean()
    .exec();
}
async function findAllPairs(){
    console.log("db history findAllPairs")
    return await TokenHistory.find()
    .select({ 'token0.contract': 1, 'token0.decimals': 1, 'token1.contract': 1, 'token1.decimals': 1, pair: 1, router: 1, reserve0: 1, reserve1: 1 })
    .lean()
    .exec();
}


module.exports = {
    findPairsWithFilters,
    findPairs,
    findPairsMultiple,
    findTokensWithMultipleRouters,
    findAllPairs,
    findAllowedRoutersPairs
}