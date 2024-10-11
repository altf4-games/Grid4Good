// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Grid {
    event PixelUpdated(uint256 x, uint256 y, address owner, uint256 color);

    struct Pixel {
        address owner;
        uint256 color;
    }

    uint256 public constant GRID_SIZE = 100;
    uint256 public constant PIXEL_PRICE = 0.01 ether;

    mapping(uint256 => mapping(uint256 => Pixel)) public pixels;

    constructor() {}

    function buyPixel(uint256 x, uint256 y, uint256 color) external payable {
        require(msg.value >= PIXEL_PRICE, "Insufficient Ether to buy pixel");
        require(x < GRID_SIZE && y < GRID_SIZE, "Invalid coordinates");

        Pixel storage pixel = pixels[x][y];

        pixel.owner = msg.sender;
        pixel.color = color;

        emit PixelUpdated(x, y, msg.sender, color);
    }

    function getPixel(
        uint256 x,
        uint256 y
    ) external view returns (address, uint256) {
        require(x < GRID_SIZE && y < GRID_SIZE, "Invalid coordinates");
        Pixel storage pixel = pixels[x][y];
        return (pixel.owner, pixel.color);
    }

    function withdraw() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}
