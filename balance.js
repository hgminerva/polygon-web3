require('dotenv').config();
const Web3 = require('web3');

async function main() {
    const testnet = process.env.TESTNET;
    const walletAddress = process.env.ADDRESS1;

    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    const getBalance = await web3.eth.getBalance(walletAddress)
    const ethBalance = web3.utils.fromWei(getBalance, 'ether')
    console.log(ethBalance)
}

main().catch(console.error).finally(() => process.exit());