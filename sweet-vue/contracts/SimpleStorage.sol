pragma solidity >=0.4.21 <0.6.0;

contract SimpleStorage {
    event StorageSet(string _message);

    uint storedData;

    function set(uint x) public {
        storedData = x;

        emit StorageSet("Data stored successfully!");
    }

    function get_data() external view returns (uint) {
        return storedData;
    }
}
