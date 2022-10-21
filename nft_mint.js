require('dotenv').config();

const fs = require('fs');
const Web3 = require('web3');

async function main() {
    const testnet = process.env.TESTNET;
    const walletAddress = process.env.ADDRESS1;
    const walletAddressPrivateKey = process.env.ADDRESS1_PRIVATE_KEY;
    const nftContract = process.env.NFT_CONTRACT;

    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    const abi = JSON.parse(fs.readFileSync("./bnft_abi.json"));
    let contract = new web3.eth.Contract(abi, nftContract);
    const nonce = await web3.eth.getTransactionCount(walletAddress, "latest");
    const transaction = {
        from: walletAddress,
        to: nftContract,
        nonce: nonce,
        gas: 500000,
        data: contract.methods.safeMint(walletAddress,1,"https://gateway.pinata.cloud/ipfs/QmaYuG1oV8Njh4MwtJ6CuzYuhBFfL9xfAiC3b13vtG2mZc").encodeABI(),
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