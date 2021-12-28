const crypto = require("crypto");

module.exports = class Block {
  constructor(data, previousHash = "") {
    this.timestamp = Date.now(); // Current timestamp
    this.data = data; // Data
    this.previousHash = previousHash; // Previous block's hash
    this.nonce = 0; // For security reasons, we need to define some constraints about how the hash should be formatted to be valid
    this.hash = this.calculateHash(); // Compute this block's hash
  }

  /**
   * Calculate the hash for this block
   */
  calculateHash() {
    let payload = `${this.previousHash}_${this.timestamp}_${JSON.stringify(this.data)}_${this.nonce}`;
    return crypto.createHash("sha256").update(payload).digest("hex");
  }

  /**
   * Proof of work is the concept applied to increase the difficulty entailed in mining or adding new blocks to the blockchain
   */
  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
};
