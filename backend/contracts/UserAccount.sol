// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Smart contract to create, manage and fetch user account info from the blockchain
contract UserAccount {
    struct UserInfo {
        string userName;
        string userEmail;
        string userBiography;
    }

    // Blockchain address mapping to user information
    mapping(address => UserInfo) private userInfo;

    // Log the registration of new user accounts
    event UserRegistered(address indexed user, string userName, string userEmail, string userBiography);

    // Log the update of user information
    event UserInfoUpdated(address indexed user, string newUserName, string newUserEmail, string newUserBiography);

    // Register new user account
    function registerUser(string memory _name, string memory _email, string memory _biography) public {
        // Biography is an optional field
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(userInfo[msg.sender].userName).length == 0, "User already registered"); //Assumption that unique usernames are required for our application

        UserInfo memory newUser = UserInfo(_name, _email, _biography);
        userInfo[msg.sender] = newUser;

        emit UserRegistered(msg.sender, _name, _email, _biography);
    }

    // Get the information of a user's account
    function getUserInfo() public view returns (string memory, string memory, string memory) {
        UserInfo memory user = userInfo[msg.sender];
        return (user.userName, user.userEmail, user.userBiography);
    }

    // Update user information
    function updateUserInfo(string memory _newName, string memory _newEmail, string memory _newBiography) public {
        require(bytes(_newName).length > 0, "Name cannot be empty");
        require(bytes(_newEmail).length > 0, "Email cannot be empty");
        require(bytes(userInfo[msg.sender].userName).length > 0, "User not registered"); // Ensure the user is registered

        userInfo[msg.sender].userName = _newName;
        userInfo[msg.sender].userEmail = _newEmail;
        userInfo[msg.sender].userBiography = _newBiography;

        emit UserInfoUpdated(msg.sender, _newName, _newEmail, _newBiography);
    }
}
