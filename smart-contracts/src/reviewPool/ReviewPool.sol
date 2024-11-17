// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ReviewerSBT} from "../reviewerProfile/ReviewerSBT.sol";
import {Initializable} from "@openzeppelin-contracts-4.9.5/proxy/utils/Initializable.sol";

error ReviewPool__InvalidPayment();
error ReviewPool__InvalidReviewers();
error ReviewPool__EmptyPaperUri();
error ReviewPool__InvalidReviewer();
error ReviewPool__ReviewClaimFailed();
error ReviewPool__Full();

contract ReviewPool is Initializable {

    uint256 public requiredReviewerNumber;
    uint256 private reviewProgress;

    bytes32 public tagTypesHash;
    string public paperUri;
    string public paperTitle;
    address public author;
    address[] public reviewersList;
    string[] private reviews;
    mapping(address => string) private reviewerToReview;
    address private REVIEWER_SBT_ADDRESS;
    
    mapping(address => bool) public hasReviewed;

    event ReviewerAdded(address indexed reviewer);
    event ReviewRewardClaimed(address indexed reviewer, uint256 amount);

    constructor(){
        _disableInitializers();
    }

    function initialize(
        uint256 _reviewers, 
        bytes32 _tagTypesHash, 
        string memory _paperUri,
        string memory _paperTitle,
        address _SBTAddress,
        address _author) external payable initializer {
        if(msg.value == 0) revert ReviewPool__InvalidPayment();
        if(_reviewers == 0) revert ReviewPool__InvalidReviewers();
        if(bytes(_paperUri).length == 0) revert ReviewPool__EmptyPaperUri();

        requiredReviewerNumber = _reviewers;
        tagTypesHash = _tagTypesHash;
        paperUri = _paperUri;
        reviewProgress = 0;
        REVIEWER_SBT_ADDRESS = _SBTAddress;
        paperTitle = _paperTitle;
        author = _author;
    }

    function addReviewer(uint256 _tokenId) public {
        ReviewerSBT reviewerProfile = ReviewerSBT(REVIEWER_SBT_ADDRESS);

        if(reviewersList.length >= requiredReviewerNumber) revert ReviewPool__Full();
        if(msg.sender != reviewerProfile.ownerOf(_tokenId)) revert ReviewPool__InvalidReviewer();
        if(reviewerProfile.getTagTypeHash(_tokenId) != tagTypesHash) revert ReviewPool__InvalidReviewer();

        reviewersList.push(msg.sender);

        emit ReviewerAdded(msg.sender);
    }

    function claimReviewReward(string memory _review) public {
        bool isValidReviewer = false;
        for(uint256 i = 0; i < reviewersList.length; i++) {
            if(msg.sender == reviewersList[i] && !hasReviewed[msg.sender]) {
                isValidReviewer = true;
                hasReviewed[msg.sender] = true;
                break;
            }
        }
        if(!isValidReviewer) revert ReviewPool__InvalidReviewer();

        reviewProgress++;
        reviews.push(_review);
        reviewerToReview[msg.sender] = _review;
        uint256 reviewerShare = address(this).balance / requiredReviewerNumber;

        (bool success, ) = msg.sender.call{value: reviewerShare}("");
        if(!success) revert ReviewPool__ReviewClaimFailed();

        emit ReviewRewardClaimed(msg.sender, reviewerShare);
    }

    function getReviewProgress() public view returns (uint256) {
        return reviewProgress;
    }

    function getAllReviews() public view returns (string[] memory) {
        return reviews;
    }

    function getReview(address _reviewer) public view returns (string memory) {
        return reviewerToReview[_reviewer];
    }

    function getPoolIsFull() public view returns (bool) {
        return reviewersList.length >= requiredReviewerNumber;
    }

    function isReviewCompleted() public view returns (bool) {
        return reviewProgress >= requiredReviewerNumber;
    }

    receive() external payable {
        revert ReviewPool__InvalidPayment();
    }

}