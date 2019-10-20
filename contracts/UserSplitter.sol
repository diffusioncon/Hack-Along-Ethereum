pragma solidity ^0.5.10;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract UserSplitter is Ownable {
    using SafeMath for uint256;

    address payable[] internal _users;

    event Add(address user);

    function ()
        external
        payable
    {
        uint256 userAmount = msg.value.div(_users.length);
        for (uint256 i = 0; i < _users.length; i++) {
            _transfer(_users[i], userAmount);
        }
    }

    function add(address payable user)
        public
        onlyOwner
    {
        _users.push(user);

        emit Add(user);
    }

    function cnt()
        public
        view
        returns (uint256)
    {
        return _users.length;
    }

    function getAll()
        external
        view
        returns (address payable[] memory)
    {
        return _users;
    }

    function _transfer(address dst, uint256 amount)
        internal
    {
        (bool success, ) = dst.call.value(amount)("");
        require(success, "Transfer failed");
    }
}
