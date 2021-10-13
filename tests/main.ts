
const { ZERO_ADDRESS, BURN_ADDRESS, ROLE, Data } = require('./helpers/common');
import cliTable = require('cli-table');
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
const { expect } = chai;
// make sure to have ethers.js 5.X required, else this will fail!
const BigNumber = ethers.BigNumber;


let LameloStats: any;
let data: any, owner: any, testingAccount1: any, testingAccount2: any, testingAccount3: any;
let testingAccount4: any, testingAccount5: any, testingAccount6: any;

describe("Lamelo - Stats", function () {


    before(async function () {

        data = new Data();
        await data.init();

        owner = data.deployerSigner;
        testingAccount1 = data.user1Signer;
        testingAccount2 = data.user2Signer;
        testingAccount3 = data.user3Signer;
        testingAccount4 = data.user4Signer;
        testingAccount5 = data.user5Signer;
        testingAccount6 = data.user6Signer;

    });

    describe("Deployment", function () {

        before(async function () {

            const LameloStatsArtifacts = await ethers.getContractFactory("LameloStats");
            LameloStats = await LameloStatsArtifacts.deploy();
            await LameloStats.deployed();
            console.log("    LameloStats:             ", LameloStats.address);
        });

        it("test", async function () {

            // const HomeOrAway = 'away'.split('').map(function (c) { return c.charCodeAt (0); })
            const dataPoints = [

                // custom computed
                { id: "Timestamp",              type: "uint32", value: 4294967295 },
                // HomeOrAway -> if value == "home" => true / else false
                { id: "Home",                   type: "bool",   value: true },

                { id: "Season",                 type: "uint8", value: 1 },
                { id: "IsGameOver",             type: "bool",  value: true },
                { id: "GlobalGameID",           type: "uint32",value: 4294967295 },
                { id: "FieldGoalsMade",         type: "uint8", value: 1 },
                { id: "FieldGoalsAttempted",    type: "uint8", value: 2 },
                { id: "TwoPointersMade",        type: "uint8", value: 3 },
                { id: "TwoPointersAttempted",   type: "uint8", value: 4 },
                { id: "ThreePointersMade",      type: "uint8", value: 5 },
                { id: "ThreePointersAttempted", type: "uint8", value: 6 },
                { id: "FreeThrowsMade",         type: "uint8", value: 7 },
                { id: "FreeThrowsAttempted",    type: "uint8", value: 8 },
                { id: "OffensiveRebounds",      type: "uint8", value: 9 },
                { id: "DefensiveRebounds",      type: "uint8", value: 10 },
                { id: "Rebounds",               type: "uint8", value: 11 },
                { id: "Assists",                type: "uint8", value: 12 },
                { id: "Steals",                 type: "uint8", value: 13 },
                { id: "BlockedShots",           type: "uint8", value: 14 },
                { id: "DoubleDoubles",          type: "uint8", value: 15 },
                { id: "TripleDoubles",          type: "uint8", value: 16 },
                { id: "Points",                 type: "uint16", value: 17 },

            ]

            const dataTypes = [];
            const dataValues = [];
            
            for(let i = 0; i < dataPoints.length; i++) {
                dataTypes.push(dataPoints[i].type);
                dataValues.push(dataPoints[i].value);
            }

            const result = ethers.utils.solidityPack(dataTypes, dataValues);
            let tx = await LameloStats.fulfill("0x1234567890123456789012345678901234567890012345678901234567890123", result);
            let receipt = await tx.wait();
            console.log("gasCost", receipt.cumulativeGasUsed.toString());


            let stats = await LameloStats.getStats(1);
            console.log("stats", stats);

            let dataPoint_HomeOrAway = await LameloStats.getHomeOrAway(1);
            console.log("HomeOrAway", dataPoint_HomeOrAway);

            let dataPoint_IsGameOver = await LameloStats.IsGameOver(1);
            console.log("IsGameOver", dataPoint_IsGameOver);

        });
    })
});