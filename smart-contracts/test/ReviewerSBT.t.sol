// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test, console2} from "forge-std-1.9.4/Test.sol";

contract ReviewerSBTTest is Test {
    // State variables
    address public owner;
    address public user;

    // Setup function runs before each test
    function setUp() public {
        owner = makeAddr("owner");
        user = makeAddr("user");
        vm.startPrank(owner);
        // Deploy your contracts here
        vm.stopPrank();
    }

    // Example test function
    function test_Example() public {
        assertTrue(true);
    }

    // Example test that should revert
    function testFail_Example() public {
        assertTrue(false);
    }

    // Example test using fuzzing
    function testFuzz_Example(uint256 x) public {
        assertTrue(x == x);
    }
}
