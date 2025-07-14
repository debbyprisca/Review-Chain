// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InstitutionalReview {
    struct Institution {
        uint256 id;
        string name;
        string category;
        string description;
        string website;
        address owner;
        uint256 totalReviews;
        uint256 totalRating;
        uint256 timestamp;
        bool isActive;
    }

    struct Review {
        uint256 id;
        uint256 institutionId;
        address reviewer;
        uint256 rating;
        string title;
        string content;
        uint256 timestamp;
        bool isVerified;
    }

    mapping(uint256 => Institution) public institutions;
    mapping(uint256 => Review) public reviews;
    mapping(address => uint256[]) public userReviews;
    mapping(uint256 => uint256[]) public institutionReviews;

    uint256 public institutionCount;
    uint256 public reviewCount;
    uint256 public constant MAX_RATING = 5;

    event InstitutionAdded(uint256 indexed id, string name, address owner);
    event ReviewAdded(uint256 indexed id, uint256 institutionId, address reviewer, uint256 rating);
    event InstitutionUpdated(uint256 indexed id);

    modifier onlyInstitutionOwner(uint256 _institutionId) {
        require(institutions[_institutionId].owner == msg.sender, "Not institution owner");
        _;
    }

    modifier validRating(uint256 _rating) {
        require(_rating >= 1 && _rating <= MAX_RATING, "Invalid rating");
        _;
    }

    function addInstitution(
        string memory _name,
        string memory _category,
        string memory _description,
        string memory _website
    ) external returns (uint256) {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_category).length > 0, "Category required");

        institutionCount++;
        institutions[institutionCount] = Institution({
            id: institutionCount,
            name: _name,
            category: _category,
            description: _description,
            website: _website,
            owner: msg.sender,
            totalReviews: 0,
            totalRating: 0,
            timestamp: block.timestamp,
            isActive: true
        });

        emit InstitutionAdded(institutionCount, _name, msg.sender);
        return institutionCount;
    }

    function addReview(
        uint256 _institutionId,
        uint256 _rating,
        string memory _title,
        string memory _content
    ) external validRating(_rating) {
        require(_institutionId > 0 && _institutionId <= institutionCount, "Invalid institution");
        require(institutions[_institutionId].isActive, "Institution not active");
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_content).length > 0, "Content required");

        reviewCount++;
        reviews[reviewCount] = Review({
            id: reviewCount,
            institutionId: _institutionId,
            reviewer: msg.sender,
            rating: _rating,
            title: _title,
            content: _content,
            timestamp: block.timestamp,
            isVerified: false
        });

        // Update institution rating
        institutions[_institutionId].totalReviews++;
        institutions[_institutionId].totalRating += _rating;

        // Update mappings
        userReviews[msg.sender].push(reviewCount);
        institutionReviews[_institutionId].push(reviewCount);

        emit ReviewAdded(reviewCount, _institutionId, msg.sender, _rating);
    }

    function getInstitution(uint256 _id) external view returns (Institution memory) {
        require(_id > 0 && _id <= institutionCount, "Invalid institution ID");
        return institutions[_id];
    }

    function getReview(uint256 _id) external view returns (Review memory) {
        require(_id > 0 && _id <= reviewCount, "Invalid review ID");
        return reviews[_id];
    }

    function getInstitutionReviews(uint256 _institutionId) external view returns (uint256[] memory) {
        return institutionReviews[_institutionId];
    }

    function getUserReviews(address _user) external view returns (uint256[] memory) {
        return userReviews[_user];
    }

    function getAverageRating(uint256 _institutionId) external view returns (uint256) {
        require(_institutionId > 0 && _institutionId <= institutionCount, "Invalid institution");
        Institution memory institution = institutions[_institutionId];
        
        if (institution.totalReviews == 0) return 0;
        return institution.totalRating / institution.totalReviews;
    }

    function getAllInstitutions() external view returns (Institution[] memory) {
        Institution[] memory allInstitutions = new Institution[](institutionCount);
        for (uint256 i = 1; i <= institutionCount; i++) {
            allInstitutions[i - 1] = institutions[i];
        }
        return allInstitutions;
    }

    function toggleInstitutionStatus(uint256 _institutionId) external onlyInstitutionOwner(_institutionId) {
        institutions[_institutionId].isActive = !institutions[_institutionId].isActive;
        emit InstitutionUpdated(_institutionId);
    }
}