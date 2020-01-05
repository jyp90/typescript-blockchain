import * as CryptoJS from "crypto-js";

class Block {
    static calcBlockHash = (index:number, hash:string, data:string, ts:number): string => 
       CryptoJS.SHA256(`${index}${hash}${ts}${data}`).toString();

    static checkStruct = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.data === "string";

    private index: number;
    private hash: string;
    private prevHash: string;
    private data: string;
    private currentTimestamp: number;
    constructor(index: number, hash: string, data: string) {
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
const genBlock : Block = new Block(0, "", "init");
let blockchain: Block[] = [genBlock];
const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const makeBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.getIndex() + 1;
    const newHash: string = Block.calcBlockHash(
      newIndex,
      previousBlock.getHash(),
      data,
      getNewTimestamp()
    );
    const newBlock: Block = new Block(
      newIndex,
      newHash,
      data
    );
    if(isValidBlock(newBlock, getLatestBlock()))
        addBlock(newBlock);
    return newBlock;
  };
const addBlock = (candidate: Block): void => {
    blockchain.push(candidate);
}
const getHashdata = (block: Block): string => 
    Block.calcBlockHash(block.getIndex(), block.getPrevHash(), block.getData(), block.getTimestamp());

const isValidBlock = (candidate: Block, prev: Block): boolean => {
    if(!Block.checkStruct(candidate)) return false;
    else if(prev.getIndex() !== candidate.getIndex() - 1) return false;
    else if(prev.getHash() === candidate.getHash()) return false;
    else if(getHashdata(candidate) === candidate.getData()) return false;
    else return true;
}

makeBlock("second");
makeBlock("third");
makeBlock("forth");
blockchain.shift();
console.log(blockchain)
export {};