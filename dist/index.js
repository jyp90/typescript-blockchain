"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, data) {
        this.index = index;
        this.hash = hash;
        this.data = data;
    }
    getIndex() { return this.index; }
    getHash() { return this.hash; }
    getPrevHash() { return this.prevHash; }
    getData() { return this.data; }
    getTimestamp() { return this.currentTimestamp; }
}
Block.calcBlockHash = (index, hash, data, ts) => CryptoJS.SHA256(`${index}${hash}${ts}${data}`).toString();
Block.checkStruct = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.data === "string";
const genBlock = new Block(0, "", "init");
let blockchain = [genBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const makeBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.getIndex() + 1;
    const newHash = Block.calcBlockHash(newIndex, previousBlock.getHash(), data, getNewTimestamp());
    const newBlock = new Block(newIndex, newHash, data);
    if (isValidBlock(newBlock, getLatestBlock()))
        addBlock(newBlock);
    return newBlock;
};
const addBlock = (candidate) => {
    blockchain.push(candidate);
};
const getHashdata = (block) => Block.calcBlockHash(block.getIndex(), block.getPrevHash(), block.getData(), block.getTimestamp());
const isValidBlock = (candidate, prev) => {
    if (!Block.checkStruct(candidate))
        return false;
    else if (prev.getIndex() !== candidate.getIndex() - 1)
        return false;
    else if (prev.getHash() === candidate.getHash())
        return false;
    else if (getHashdata(candidate) === candidate.getData())
        return false;
    else
        return true;
};
makeBlock("second");
makeBlock("third");
makeBlock("forth");
blockchain.shift();
console.log(blockchain);
//# sourceMappingURL=index.js.map