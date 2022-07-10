// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ImageSocialMedia {

    event UploadComplete(address owner, string imageHash, string caption, uint imageCount);

    struct Image {
        string imgHash;
        string caption;
        address owner;
    }

    uint public imageCount = 0;
    mapping(uint => Image) public images;

    function uploadImage(string memory _imgHash, string memory _caption) public {
        require(bytes(_imgHash).length > 0, "Image hash cannot be empty");
        require(bytes(_caption).length > 0, "Caption cannot be empty");
        require(msg.sender!=address(0));
        console.log("Uploading image");
        imageCount = imageCount + 1;
        images[imageCount] = Image(_imgHash, _caption, msg.sender);
        emit UploadComplete(msg.sender, _imgHash, _caption, imageCount);
    }
}