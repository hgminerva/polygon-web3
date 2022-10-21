require('dotenv').config();

const fs = require('fs');
const Web3 = require('web3');

async function main() {
    const testnet = process.env.TESTNET;
    const walletAddress = process.env.ADDRESS1;
    const walletAddressPrivateKey = process.env.ADDRESS1_PRIVATE_KEY;
    const tokenContract = process.env.TOKEN_CONTRACT;

    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    const abi = JSON.parse(fs.readFileSync("./evolution_gem_abi.json"));
    let contract = new web3.eth.Contract(abi, tokenContract);
    const nonce = await web3.eth.getTransactionCount(walletAddress, "latest");
    const transaction = {
        from: walletAddress,
        to: tokenContract,
        nonce: nonce,
        gas: 500000,
        data: contract.methods.mint(200000).encodeABI(),
    };
    const signPromise = await web3.eth.accounts.signTransaction(
        transaction,
        walletAddressPrivateKey
    );
    const signedTransaction = await web3.eth.sendSignedTransaction(
        signPromise["rawTransaction"]
    );
    const hash = signedTransaction["transactionHash"];
    console.log(hash);
}

main().catch(console.error).finally(() => process.exit());