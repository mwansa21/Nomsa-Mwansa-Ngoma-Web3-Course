import { ethers } from "ethers";

// DOM elements
const connectButton = document.getElementById("connectButton");
const accountDisplay = document.getElementById("account");
const balanceDisplay = document.getElementById("balance");
const sendButton = document.getElementById("sendButton");
const toAddressInput = document.getElementById("toAddress");
const amountInput = document.getElementById("amount");

// Ethereum provider
let provider;
let signer;
let userAddress;

// Function to connect to MetaMask
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        accountDisplay.innerHTML = userAddress;

        // Get the balance
        const balance = await provider.getBalance(userAddress);
        balanceDisplay.innerHTML = ethers.formatEther(balance);
    } else {
        alert("Please install MetaMask to use this DApp.");
    }
}

// Function to send ETH
async function sendETH() {
    const toAddress = toAddressInput.value;
    const amountInETH = amountInput.value;

    if (!ethers.isAddress(toAddress)) {
        alert("Invalid recipient address.");
        return;
    }

    const amountInWei = ethers.parseEther(amountInETH);

    try {
        const tx = await signer.sendTransaction({
            to: toAddress,
            value: amountInWei
        });

        console.log("Transaction sent:", tx);
        alert(`Transaction sent! Hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error sending transaction:", error);
        alert("Failed to send transaction.");
    }
}

// Contract ABI and address
const contractAddress = "0x35cd167FA931C6c5E07AbB2621846FC35D54baD6";
const contractABI = [
    "function vote(uint256 proposalId) public"
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Function to cast a vote
async function castVote(proposalId) {
    try {
        const tx = await contract.vote(proposalId);
        console.log(`Voted for Proposal ${proposalId}:`, tx);
        alert(`Vote casted for Proposal ${proposalId}. Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error casting vote:", error);
        alert("Failed to cast vote.");
    }
}
async function voteForProposal1() {
    await castVote(1);
}


async function voteForProposal2() {
    await castVote(2);
}

document.getElementById("voteProposal1").addEventListener("click", voteForProposal1);
document.getElementById("voteProposal2").addEventListener("click", voteForProposal2);

// Event listeners
connectButton.addEventListener("click", connectWallet);
sendButton.addEventListener("click", sendETH);
