// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std-1.7.6/Script.sol";
import {ReviewerSBT} from "../src/reviewerProfile/ReviewerSBT.sol";
import {ReviewPoolFactory} from "../src/reviewPool/ReviewPoolFactory.sol";
import {ReviewPool} from "../src/reviewPool/ReviewPool.sol";

contract Deploy is Script {

    function setUp() public {

    }

    function run() external returns (ReviewerSBT) {
        vm.startBroadcast();

        ReviewerSBT reviewerSBT = new ReviewerSBT();
/*         reviewerSBT.addTagType("Physics");
        reviewerSBT.addTagType("Math");
        reviewerSBT.addTagType("Computer Science");
        reviewerSBT.addTagType("Economics");
        reviewerSBT.addTagType("Chemistry"); */
        ReviewPool reviewPool = new ReviewPool();
        ReviewPoolFactory reviewPoolFactory = new ReviewPoolFactory(address(reviewPool), address(reviewerSBT));

        vm.stopBroadcast();
    }
}
