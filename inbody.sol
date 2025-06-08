// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Inbody {

    struct InbodyData {
        string createdAt;
        string gender;
        uint256 height;
        uint256 weight;
        uint256 muscle;
        uint256 fat;
        uint256 bmi;
        string userCase;
        string armGrade;
        string bodyGrade;
        string legGrade;
    }

    mapping(address => InbodyData[]) public records;

    event InbodyRecorded(address indexed user);

    function addInbody(
        string memory _createdAt,
        string memory _gender,
        uint256 _height,
        uint256 _weight,
        uint256 _muscle,
        uint256 _fat,
        uint256 _bmi,
        string memory _userCase,
        string memory _armGrade,
        string memory _bodyGrade,
        string memory _legGrade
    ) public {
        InbodyData memory data = InbodyData(
            _createdAt, _gender, _height, _weight, _muscle,
            _fat,
            _bmi, _userCase,
            _armGrade, _bodyGrade, _legGrade
        );
        records[msg.sender].push(data);
        emit InbodyRecorded(msg.sender);
    }

    function getMyRecords() public view returns (InbodyData[] memory) {
        return records[msg.sender];
    }
}
