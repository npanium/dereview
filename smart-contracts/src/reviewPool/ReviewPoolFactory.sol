// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ReviewPool} from "./ReviewPool.sol";
import {Clones} from "@openzeppelin-contracts-4.9.5/proxy/Clones.sol";
import {Ownable} from "@openzeppelin-contracts-4.9.5/access/Ownable.sol";

contract ReviewPoolFactory is Ownable {
    using Clones for address;

    address public immutable reviewPoolImplementation;
    address public immutable REVIEWER_SBT_ADDRESS;
    mapping(uint256 => address) public reviewPoolToAddress;
    mapping(address => uint256[]) public addressToReviewPools;

    uint256 public reviewPoolCount;

    event ReviewPoolCreated(uint256 indexed reviewPoolId, address indexed reviewPoolAddress);

    constructor(address _reviewPoolImplementation, address _reviewerSBTAddress) {
        reviewPoolImplementation = _reviewPoolImplementation;
        REVIEWER_SBT_ADDRESS = _reviewerSBTAddress;
    }

    function createReviewPool(
        bytes32 _tagTypesHash, 
        string memory _paperUri, 
        string memory _paperTitle,
        uint256 _requiredReviewerNumber
    ) external payable {
        address clone = reviewPoolImplementation.cloneDeterministic(bytes32(reviewPoolCount));
        ReviewPool(payable(clone)).initialize{value: msg.value}(
            _requiredReviewerNumber,
            _tagTypesHash,
            _paperUri,
            _paperTitle,
            REVIEWER_SBT_ADDRESS,
            msg.sender
        );
        reviewPoolToAddress[reviewPoolCount] = clone;
        addressToReviewPools[msg.sender].push(reviewPoolCount);
        reviewPoolCount++;

        emit ReviewPoolCreated(reviewPoolCount, clone);
    }

    function predictNextDeterministicAddress() external view returns (address) {
        return reviewPoolImplementation.predictDeterministicAddress(bytes32(reviewPoolCount));
    }

    function getReviewPoolsByAddress(address _address) external view returns (uint256[] memory) {
        return addressToReviewPools[_address];
    }

}