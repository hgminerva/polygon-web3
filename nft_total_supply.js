require('dotenv').config();

const fs = require('fs');
const Web3 = require('web3');

async function main() {
    const testnet = process.env.TESTNET;
    const walletAddress = process.env.ADDRESS1;
    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    const abi = JSON.parse(fs.readFileSync("./evolution_gem_abi.json"));
    let contract = new web3.eth.Contract(abi, process.env.NFT_CONTRACT);

    let supply = await contract.methods.totalSupply().call();

    console.log(supply);
}

main().catch(console.error).finally(() => process.exit());