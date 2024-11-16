// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std-1.9.4/Script.sol";
import {ReviewerSBT} from "../src/reviewerProfile/ReviewerSBT.sol";
import {ReviewPoolFactory} from "../src/reviewPool/ReviewPoolFactory.sol";
import {ReviewPool} from "../src/reviewPool/ReviewPool.sol";

contract Deploy is Script {

    function setup() public {

    }

    function run() external returns (ReviewerSBT) {
        vm.startBroadcast();

        ReviewerSBT reviewerSBT = new ReviewerSBT();
        ReviewPool reviewPool = new ReviewPool();
        ReviewPoolFactory reviewPoolFactory = new ReviewPoolFactory(address(reviewPool), address(reviewerSBT));

        vm.stopBroadcast();
    }
}
