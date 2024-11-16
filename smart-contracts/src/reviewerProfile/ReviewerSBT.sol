// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ERC721} from "@openzeppelin-contracts-5.0.2/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin-contracts-5.0.2/access/Ownable.sol";
import {IERC165} from "@openzeppelin-contracts-5.0.2/utils/introspection/ERC165.sol";
import {IERC5484} from "../interfaces/IERC5484.sol";

error ReviewerSBT__NonTransferableToken();
error ReviewerSBT__NonExistentToken();

contract ReviewerSBT is ERC721, IERC5484, Ownable {
    
    uint256 tokenId;
    string[] public tagTypes;
    mapping(string => bytes32) public tagTypesHash;
    mapping(uint256 => bytes32) public tokenIdToTagTypeHash;

    BurnAuth internal burnAuthorization;

    event TagTypeAdded(string tagType);
    event TagTypeDeleted(uint256 index);
    event Burned(uint256 tokenId);

    modifier AuthorizedToBurn(uint256 _tokenId) {
        if (burnAuthorization == BurnAuth.Neither) {
            revert ReviewerSBT__NonTransferableToken();
        } else if (burnAuthorization == BurnAuth.OwnerOnly && msg.sender != ownerOf(_tokenId)) {
            revert ReviewerSBT__NonTransferableToken();
        } else if (burnAuthorization == BurnAuth.IssuerOnly && msg.sender != owner()) {
            revert ReviewerSBT__NonTransferableToken();
        } else if (burnAuthorization == BurnAuth.Both && msg.sender != owner() && msg.sender != ownerOf(_tokenId)) {
            revert ReviewerSBT__NonTransferableToken();
        }
        _;
    }
    constructor() ERC721("ReviewerSBT", "RSBT") Ownable(msg.sender) {
        burnAuthorization = BurnAuth.Both;
    }

    function mint(address to, string memory tagType) public {
        tokenIdToTagTypeHash[tokenId] = tagTypesHash[tagType];
        _mint(to, tokenId);
        tokenId++;

        emit Issued(msg.sender, to, tokenId, burnAuthorization);
    }

    function burn(uint256 _tokenId) public AuthorizedToBurn(_tokenId) {
        _burn(_tokenId);

        emit Burned(_tokenId);
    }

    function transferFrom(address, address, uint256) public virtual override {
        revert ReviewerSBT__NonTransferableToken();
    }

    function addTagType(string memory tagType) public onlyOwner {
        _addTagType(tagType);
        emit TagTypeAdded(tagType);
    }

    function deleteTagType(uint256 index) public onlyOwner {
        _deleteTagType(index);
        emit TagTypeDeleted(index);
    }

    function setBurnAuthorization(BurnAuth _burnAuthorization) public onlyOwner {
        burnAuthorization = _burnAuthorization;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        return
            interfaceId == type(IERC5484).interfaceId ||
            super.supportsInterface(interfaceId);
    }
    function burnAuth(uint256 _tokenId) override external view returns (BurnAuth) {
        if(_ownerOf(_tokenId) == address(0)) {
            revert ReviewerSBT__NonExistentToken();
        }
        return burnAuthorization;
    }

    function getAllTagTypes() public view returns (string[] memory) {
        return tagTypes;
    }

    function getTagTypeHash(string memory tagType) public view returns (bytes32) {
        return tagTypesHash[tagType];
    }

    function _addTagType(string memory tagType) internal {
        tagTypes.push(tagType);
        tagTypesHash[tagType] = keccak256(abi.encodePacked(tagType));
    }

    function _deleteTagType(uint256 index) internal {
        delete tagTypesHash[tagTypes[index]];
        tagTypes[index] = tagTypes[tagTypes.length - 1];
        tagTypes.pop();
    }

}