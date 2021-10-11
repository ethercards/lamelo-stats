const lameloNFTContractAddress = '0x163883263274e8Ef6332cFa84F35B23c6C51dF72';
const rndContractAddress = '0x4E004E0Ab7d7839cA226226E37e6FdeD38b5Ac81';

const controllers = [
    { name: "micky", address: "0x626f158e89ECe1CE777F3D1897c362B078FD7149" },
    { name: "calin", address: "0xfe7EbC878B7106EF813e32452Ba14Fe99851e311" },
    { name: "kinsun", address: "0xc9B958E0f7E8ABe45a99CCCBe06c31Dc46D8C995" },
    { name: "zoltan", address: "0x0A2926f2E2C9d60AEBf5Cfe0911FbdeFCE47Db5E" },
    { name: "gary", address: "0x11Ad435d419523b12bD1b555C91b34463FBE4A05" },
    { name: "gabor", address: "0xCB5A112184fb3d685eE2b86f35FC4C8373fcb040" },
    { name: "tamas", address: "0xc0ae3844Bf0a54779D43E050b35F988aC2CDaD1d" },
    { name: "alajos", address: "0x9c69Dcd15FB57AA0DB5580a783e7AF58a8Cedc7D" },
    { name: "anjana", address: "0xCD340606defdfeCB3C8701ccDE1A32483ebDC636" },
    { name: "bernard", address: "0xcC6F94B497A357a534Af186f360699b10687EFbb" },
    { name: "morar", address: "0x034953EF37CC4A8378eE11a8e51BdD23bFb0f293" },
    { name: "greg", address: "0xd65A38bE8f6358794802cF62cb5a408F9b1ce596" },
];


const { ZERO_ADDRESS, ROLE, Data } = require('../tests/helpers/common');

async function main() {

    const accounts = await ethers.getSigners();

    let NFTToolboxArtifacts;
    let startTime, endTime;
    let nftOne;

    NFTToolboxArtifacts = await ethers.getContractFactory("NFTToolbox");
    nftOne = await NFTToolboxArtifacts.deploy();

    await nftOne.deployed();
    console.log("    NFT Toolbox:             ", nftOne.address);

    let controllerData = [];
    for(let i = 0; i < controllers.length; i++) {
        controllerData.push(controllers[i].address);
    }
    
    // add controllers
    let tx = await nftOne.controllerAdd(controllerData);
    tx.wait();
 
    const timeNow = Math.floor(Date.now() / 1000);
    startTime = timeNow;
    endTime = startTime + (24 * 3600);
  
    // deploy LameloRaffle contract
    LameloRaffleArtifacts = await ethers.getContractFactory("LameloRaffle");
    LameloRaffleInstance = await LameloRaffleArtifacts.deploy(
      nftOne.address,
      rndContractAddress,
      startTime,
      endTime 
    );
  
    await LameloRaffleInstance.deployed();
    tx = await LameloRaffleInstance.provider.getTransactionReceipt(LameloRaffleInstance.deployTransaction.hash);

    console.log("");
    console.log("    Step 1: Deploy Raffle Contract")
    console.log("       - hash:                ", LameloRaffleInstance.deployTransaction.hash);
    console.log("       - RaffleContract:      ", LameloRaffleInstance.address);
    console.log("       - GasUsed:             ", tx.cumulativeGasUsed.toNumber());
    console.log("");


    console.log("    Configuration:");
    console.log("       owner:                      ", await LameloRaffleInstance.owner() );
    console.log("");
    console.log("       NFT contract address:       ", await LameloRaffleInstance.lameloContract() );
    console.log("       rndContractAddress:         ", await LameloRaffleInstance.rnd() );
    const startTimeD = await LameloRaffleInstance.startTime();
    console.log("       startTime:                  ", startTimeD.toNumber(), new Date(startTimeD*1000).toLocaleString("en-US") );
    const endTimeD = await LameloRaffleInstance.endTime();
    console.log("       endTime:                    ", endTimeD.toNumber(), new Date(endTimeD*1000).toLocaleString("en-US") );
   

    let idsToMint = [498, 499, 500];
    let minttx = await nftOne.batchMint(idsToMint, accounts[0].address);
    await minttx.wait();
    await nftOne["safeTransferFrom(address,address,uint256)"](accounts[0].address, LameloRaffleInstance.address, 498);
    await nftOne["safeTransferFrom(address,address,uint256)"](accounts[0].address, LameloRaffleInstance.address, 499);
    await nftOne["safeTransferFrom(address,address,uint256)"](accounts[0].address, LameloRaffleInstance.address, 500);


    console.log("");
    console.log( 
        "npx hardhat verify --network rinkeby --contract contracts/LameloRaffle.sol:LameloRaffle",
        LameloRaffleInstance.address,
        '"'+nftOne.address+'"',
        '"'+rndContractAddress+'"',
        '"'+startTime+'"',
        '"'+endTime+'"',
    );

    console.log("");
    console.log( 
        "npx hardhat verify --network rinkeby --contract contracts/NFTToolbox.sol:NFTToolbox",
        nftOne.address,
    );


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });