// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {ReviewerSBT} from "../src/ReviewerSBT.sol";

contract DeployMainnet is Script {

    function setup(){

    }

    function run() external returns (ReviewerSBT) {
        vm.startBroadcast();

        ReviewerSBT reviewerSBT = new ReviewerSBT();

        vm.stopBroadcast();
    }
}
