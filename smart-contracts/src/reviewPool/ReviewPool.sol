// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ReviewerSBT} from "../reviewerProfile/ReviewerSBT.sol";
import {Initializable} from "@openzeppelin-contracts-5.0.2/proxy/utils/Initializable.sol";

error ReviewPool__InvalidPayment();
error ReviewPool__InvalidReviewers();
error ReviewPool__EmptyPaperUri();
error ReviewPool__InvalidReviewer();
error ReviewPool__ReviewClaimFailed();
error ReviewPool__Full();

contract ReviewPool is Initializable {

    uint256 public requiredReviewerNumber;
    uint256 public poolPrize;
    uint256 public reviewerShare;
    uint256 private reviewProgress;

    bytes32 public tagTypesHash;
    string public paperUri;

    address[] public reviewersList;
    string[] private reviews;
    mapping(address => string) private reviewerToReview;
    address constant REVIEWER_SBT_ADDRESS = 0x0000000000000000000000000000000000000000;
    
    mapping(address => bool) public hasReviewed;

    event ReviewerAdded(address indexed reviewer);
    event ReviewRewardClaimed(address indexed reviewer, uint256 amount);

    constructor(){
        _disableInitializers();
    }

    function initialize(
        uint256 _reviewers, 
        bytes32 _tagTypesHash, 
        string memory _paperUri) external payable initializer {
        if(msg.value == 0) revert ReviewPool__InvalidPayment();
        if(_reviewers == 0) revert ReviewPool__InvalidReviewers();
        if(bytes(_paperUri).length == 0) revert ReviewPool__EmptyPaperUri();

        requiredReviewerNumber = _reviewers;
        tagTypesHash = _tagTypesHash;
        paperUri = _paperUri;
        poolPrize = msg.value;
        reviewerShare = poolPrize / requiredReviewerNumber;
        reviewProgress = 0;
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