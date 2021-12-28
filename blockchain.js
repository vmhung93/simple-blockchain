const Block = require("./block");

module.exports = class BlockChain {
  constructor({ difficulty = 2 }) {
    // Initialize a new array of blocks, starting with a genesis block
    this.blockchain = [this.initGenesisBlock()];
    this.difficulty = difficulty;
  }

  initGenesisBlock() {
    // Create an empty block to start
    return new Block({});
  }

  latestBlock() {
    // Get last block on the chain
    return this.blockchain[this.blockchain.length - 1];
  }

  /**
   * Add a new block
   */
  addNewBlock(newBlock) {
    // Set its previous hash to the correct value
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.proofOfWork(this.difficulty);

    // Add the block to our chain
    this.blockchain.push(newBlock);
  }

  /**
   * Verifying blockchain integrity
   * Check to see that all the hashes are correct and the chain is therefore valid
   */
  checkChainValidity() {
    const length = this.blockchain.length;

    for (let idx = 1; idx < length; idx++) {
      const currentBlock = this.blockchain[idx];
      const previousBlock = this.blockchain[idx - 1];

      // Checking current block hash
      const isValidHash = currentBlock.hash === currentBlock.calculateHash();

      // Comparing current block hash with the previous block hash
      const isPreviousHashValid =
        currentBlock.previousHash === previousBlock.hash;

      const isValidChain = isValidHash && isPreviousHashValid;

      if (!isValidChain) {
        return false;
      }
    }

    return true;
  }
};
