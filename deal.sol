// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Transaction {
    struct TransactionStruct {
        uint id;
        address seller;
        address buyer;
        uint transactionPeriod;
        uint amount;
        string info;
        bool paid;
        uint createdAt;
    }

    uint public nextTransactionId = 1;
    mapping(uint => TransactionStruct) public transactions;

    event TransactionCreated(
        uint indexed id,
        address indexed seller,
        address indexed buyer,
        uint transactionPeriod,
        uint amount,
        string info
    );

    event TransactionPaid(
        uint indexed id,
        address buyer,
        uint amount
    );

    event TransactionUpdated(
        uint indexed id,
        uint transactionPeriod,
        uint amount,
        string info
    );

    event TransactionDeleted(
        uint indexed id
    );

    // 거래 생성 (판매자)
    function createTransaction(
        address buyer,
        uint transactionPeriod,
        uint amount,
        string calldata info
    ) external {
        require(buyer != address(0), "Buyer address cannot be zero");
        require(amount > 0, "Amount must be greater than 0");

        transactions[nextTransactionId] = TransactionStruct({
            id: nextTransactionId,
            seller: msg.sender,
            buyer: buyer,
            transactionPeriod: transactionPeriod,
            amount: amount,
            info: info,
            paid: false,
            createdAt: block.timestamp
        });

        emit TransactionCreated(
            nextTransactionId,
            msg.sender,
            buyer,
            transactionPeriod,
            amount,
            info
        );

        nextTransactionId++;
    }

    // 거래 송금 (구매자만)
    function payForTransaction(uint id) external payable {
        TransactionStruct storage t = transactions[id];
        require(!t.paid, "Already paid");
        require(msg.sender == t.buyer, "Only registered buyer can pay");
        require(msg.value == t.amount, "Incorrect payment amount");

        payable(t.seller).transfer(msg.value);
        t.paid = true;

        emit TransactionPaid(id, msg.sender, msg.value);
    }

    // 거래 수정 (판매자만 가능)
    function updateTransaction(
        uint transactionId,
        uint transactionPeriod,
        uint amount,
        string calldata info
    ) external {
        TransactionStruct storage t = transactions[transactionId];
        require(msg.sender == t.seller, "Only seller can update");

        t.transactionPeriod = transactionPeriod;
        t.amount = amount;
        t.info = info;

        emit TransactionUpdated(
            transactionId,
            transactionPeriod,
            amount,
            info
        );
    }

    // 거래 삭제 (판매자만 가능)
    function deleteTransaction(uint transactionId) external {
        TransactionStruct storage t = transactions[transactionId];
        require(msg.sender == t.seller, "Only seller can delete");

        delete transactions[transactionId];
        emit TransactionDeleted(transactionId);
    }

    // 내 거래 목록 (판매자 또는 구매자)
    function getTransactions() external view returns (TransactionStruct[] memory) {
        uint count = 0;
        for (uint i = 1; i < nextTransactionId; i++) {
            if (_isMyTransaction(transactions[i])) {
                count++;
            }
        }

        TransactionStruct[] memory result = new TransactionStruct[](count);
        uint index = 0;
        for (uint i = 1; i < nextTransactionId; i++) {
            if (_isMyTransaction(transactions[i])) {
                result[index] = transactions[i];
                index++;
            }
        }

        return result;
    }

    // 단건 조회
    function getTransaction(uint id) external view returns (
        uint, address, address, uint, uint, string memory, bool, uint
    ) {
        TransactionStruct storage t = transactions[id];
        
        return (
            t.id,
            t.seller,
            t.buyer,
            t.transactionPeriod,
            t.amount,
            t.info,
            t.paid,
            t.createdAt
        );
    }

    // 내부: 내 거래인지 확인 (판매자 또는 구매자)
    function _isMyTransaction(TransactionStruct storage t) internal view returns (bool) {
        return msg.sender == t.seller || msg.sender == t.buyer;
    }
}

