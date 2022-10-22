require('dotenv').config();

const fs = require('fs');
const Web3 = require('web3');

async function main() {
    const testnet = process.env.TESTNET;
    const nftContract = process.env.NFT_CONTRACT;

    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    const abi = JSON.parse(fs.readFileSync("./bnft_abi.json"));
    let contract = new web3.eth.Contract(abi, nftContract);
    let nft1 =  await contract.methods.tokenURI(1).call();
    console.log(nft1);
    let nft2 =  await contract.methods.tokenURI(2).call();
    console.log(nft2);
}

main().catch(console.error).finally(() => process.exit());