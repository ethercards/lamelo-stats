const lameloNFTContractAddress = '0x139b522955d54482e7662927653abb0bfb6f19ba';
const rndContractAddress = '0x72170F577F3B221b3478E09ccD5323445a8460d7';

const { ZERO_ADDRESS, ROLE, Data } = require('../tests/helpers/common');

async function main() {

    const accounts = await ethers.getSigners();
  
    let startTime, endTime;
    let tx;
     
    // const timeNow = Math.floor(Date.now() / 1000);
    startTime = 1629414000; // Thu Aug 19 2021 23:00:00 GMT+0000
    endTime = startTime + (28 * 24 * 3600);
  
    // deploy LameloRaffle contract
    LameloRaffleArtifacts = await ethers.getContractFactory("LameloDrop");
    LameloRaffleInstance = await LameloRaffleArtifacts.deploy(
        lameloNFTContractAddress,
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
   

    console.log("");
    console.log( 
        "npx hardhat verify --network mainnet --contract contracts/LameloDrop.sol:LameloDrop",
        LameloRaffleInstance.address,
        '"'+lameloNFTContractAddress+'"',
        '"'+rndContractAddress+'"',
        '"'+startTime+'"',
        '"'+endTime+'"',
    );


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });