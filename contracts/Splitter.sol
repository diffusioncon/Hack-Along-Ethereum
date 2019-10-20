pragma solidity ^0.5.10;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Splitter is Ownable {
    using SafeMath for uint256;

    uint256 constant private DIVISOR = 100;

    address internal _tbiGiver;
    address internal _cbiGiver;
    address internal _xsGiver;

    uint256 internal _tbiPercent;
    uint256 internal _cbiPercent;

    event SetSplit(uint256 tbiPercent, uint256 cbiPercent, uint256 xsPercent);
    event SetTBIGiver(address tbiGiver);
    event SetCBIGiver(address cbiGiver);
    event SetXSGiver(address xsGiver);

    function setTBIGiver(address tbiGiver)
        public
        onlyOwner
    {
        _tbiGiver = tbiGiver;
        emit SetTBIGiver(_tbiGiver);
    }

    function setCBIGiver(address cbiGiver)
        public
        onlyOwner
    {
        _cbiGiver = cbiGiver;
        emit SetCBIGiver(_cbiGiver);
    }

    function setXSGiver(address xsGiver)
        public
        onlyOwner
    {
        _xsGiver = xsGiver;
        emit SetXSGiver(_xsGiver);
    }

    function setSplit(
        uint256 tbiPercent,
        uint256 cbiPercent
    )
        public
        onlyOwner
    {
        require(tbiPercent > 0, "TBI percent must not be zero");
        require(cbiPercent > 0, "CBI percent must not be zero");
        require(tbiPercent + cbiPercent < DIVISOR, "Total split mut be less than 100 percent");

        _tbiPercent = tbiPercent;
        _cbiPercent = cbiPercent;

        uint256 xsPercent = DIVISOR.sub(_tbiPercent.add(_cbiPercent));

        emit SetSplit(_tbiPercent, _cbiPercent, xsPercent);
    }

    function ()
        external
        payable
    {
        uint256 tbiAmount = msg.value.mul(_tbiPercent.div(DIVISOR));
        uint256 cbiAmount = msg.value.mul(_cbiPercent.div(DIVISOR));
        uint256 xsAmount = msg.value.sub(tbiAmount.add(cbiAmount));

        _transfer(_tbiGiver, tbiAmount);
        _transfer(_cbiGiver, cbiAmount);
        _transfer(_xsGiver, xsAmount);
    }

    function _transfer(address dst, uint256 amount)
        internal
    {
        (bool success, ) = dst.call.value(amount)("");
        require(success, "Transfer failed");
    }

}
