const EnumChainId = require("./enum/chain.id");
const { toCheckSum } = require("./utils/addresses");
let scraperConfig = {
    [EnumChainId.BSC]: {
        "save_price": true, // do you want the scraper to save the price records of the tokens ?
        "save_transactions": true, // do you want the scraper to save every swap transaction ?
        "calculate_pair_fees": true, // do you want the scraper to save the fees of all the pairs ?
        "whitelist_enabled": false,// do you want the scraper to scrape only specific given tokens ?
        "whitelist": [ // pass here the tokens to whitelist as the example one 
            toCheckSum("0xc748673057861a797275CD8A068AbB95A902e8de") // example whitelisted token
        ], 
        "use_checkpoint_when_restart": false, // if the scraper crashes, it has to scrape all the block since the latest one scraped?
        "http_provider": "https://evocative-blue-shadow.bsc.quiknode.pro/15d615c2229bf735bad93ab9079c4661a41cac80/", // to fill
        "ws_provider": "wss://evocative-blue-shadow.bsc.quiknode.pro/15d615c2229bf735bad93ab9079c4661a41cac80/", // to fill
    }
}
module.exports = scraperConfig;