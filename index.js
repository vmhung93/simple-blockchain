const Block = require("./block");
const BlockChain = require("./blockchain");

// Create two test blocks with some sample data
let a = new Block({ from: "Joe", to: "Jane" });
let b = new Block({ from: "Jane", to: "Joe" });

let chain = new BlockChain({ difficulty: 2 }); // Init our chain
chain.addNewBlock(a); // Add block a
chain.addNewBlock(b); // Add block b

console.log(JSON.stringify(chain, " ", 4)); // Print out the blockchain
console.log("Validity: " + chain.checkChainValidity()); // Check our chain for validity
