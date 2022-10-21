require('dotenv').config();

const fs = require('fs');
const Web3 = require('web3');

async function main() {
    const testnet = process.env.TESTNET;
    const walletAddress1 = process.env.ADDRESS1;
    const walletAddress1PrivateKey = process.env.ADDRESS1_PRIVATE_KEY;
    const walletAddress2 = process.env.ADDRESS2;
    const nftContract = process.env.NFT_CONTRACT;

    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    const abi = JSON.parse(fs.readFileSync("./bnft_abi.json"));
    let contract = new web3.eth.Contract(abi, nftContract);
    const nonce = await web3.eth.getTransactionCount(walletAddress1, "latest");
    const transaction = {
        from: walletAddress1,
        to: nftContract,
        nonce: nonce,
        gas: 500000,
        data: contract.methods.safeTransferFrom(walletAddress1, walletAddress2, 1).encodeABI(),
    };
    const signPromise = await web3.eth.accounts.signTransaction(
        transaction,
        walletAddress1PrivateKey
    );
    const signedTransaction = await web3.eth.sendSignedTransaction(
        signPromise["rawTransaction"]
    );
    const hash = signedTransaction["transactionHash"];
    console.log(hash);
}

main().catch(console.error).finally(() => process.exit());