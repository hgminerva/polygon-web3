require('dotenv').config();

const fs = require('fs');
const Web3 = require('web3');

async function main() {
    const testnet = process.env.TESTNET;
    const walletAddress1 = process.env.ADDRESS1;
    const walletAddress2 = process.env.ADDRESS2;
    const tokenContract = process.env.TOKEN_CONTRACT;

    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    const abi = JSON.parse(fs.readFileSync("./evolution_gem_abi.json"));
    let contract = new web3.eth.Contract(abi, tokenContract);
    let balance =  await contract.methods.balanceOf(walletAddress1).call();
    console.log(balance);
}

main().catch(console.error).finally(() => process.exit());