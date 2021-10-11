/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LameloStats, LameloStatsInterface } from "../LameloStats";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "IsGameOver",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "fulfill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getHomeOrAway",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getStats",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "statsCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600060015534801561001557600080fd5b5061080a806100256000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806365951da71461005c5780637b303965146100a05780637c1de7e114610147578063a5ae58931461020c578063a66fb13a14610250575b600080fd5b6100886004803603602081101561007257600080fd5b810190808035906020019092919050505061026e565b60405180821515815260200191505060405180910390f35b6100cc600480360360208110156100b657600080fd5b8101908080359060200190929190505050610350565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61020a6004803603604081101561015d57600080fd5b81019080803590602001909291908035906020019064010000000081111561018457600080fd5b82018360208201111561019657600080fd5b803590602001918460018302840111640100000000831117156101b857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610404565b005b6102386004803603602081101561022257600080fd5b810190808035906020019092919050505061043d565b60405180821515815260200191505060405180910390f35b610258610520565b6040518082815260200191505060405180910390f35b6000600161034560006103376001806000808981526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103235780601f106102f857610100808354040283529160200191610323565b820191906000526020600020905b81548152906001019060200180831161030657829003601f168201915b50505050506105269092919063ffffffff16565b61069890919063ffffffff16565b60ff16149050919050565b60606000808381526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103f85780601f106103cd576101008083540402835291602001916103f8565b820191906000526020600020905b8154815290600101906020018083116103db57829003601f168201915b50505050509050919050565b8060008060016000815460010191905081905581526020019081526020016000209080519060200190610438929190610729565b505050565b600060016105156000610507600060016000808981526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104f35780601f106104c8576101008083540402835291602001916104f3565b820191906000526020600020905b8154815290600101906020018083116104d657829003601f168201915b50505050506105269092919063ffffffff16565b61069890919063ffffffff16565b60ff16149050919050565b60015481565b606081601f830110156105a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f736c6963655f6f766572666c6f7700000000000000000000000000000000000081525060200191505060405180910390fd5b8183018451101561061a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f736c6963655f6f75744f66426f756e647300000000000000000000000000000081525060200191505060405180910390fd5b606082156000811461063b576040519150600082526020820160405261068c565b6040519150601f8416801560200281840101858101878315602002848b0101015b81831015610679578051835260208301925060208101905061065c565b50868552601f19601f8301166040525050505b50809150509392505050565b60006001820183511015610714576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f746f55696e74385f6f75744f66426f756e64730000000000000000000000000081525060200191505060405180910390fd5b60008260018501015190508091505092915050565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928261075f57600085556107a6565b82601f1061077857805160ff19168380011785556107a6565b828001600101855582156107a6579182015b828111156107a557825182559160200191906001019061078a565b5b5090506107b391906107b7565b5090565b5b808211156107d05760008160009055506001016107b8565b509056fea264697066735822122083a9c096a1cd445ddcda84a8af091c7efb43658db39317dcf45a29692aa1a64564736f6c63430007050033";

export class LameloStats__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LameloStats> {
    return super.deploy(overrides || {}) as Promise<LameloStats>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LameloStats {
    return super.attach(address) as LameloStats;
  }
  connect(signer: Signer): LameloStats__factory {
    return super.connect(signer) as LameloStats__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LameloStatsInterface {
    return new utils.Interface(_abi) as LameloStatsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LameloStats {
    return new Contract(address, _abi, signerOrProvider) as LameloStats;
  }
}
