const checkSeatName = function (seatName) {
    switch (seatName) {
        case 0:
            return "A1";
        case 1:
            return "A2";
        case 2:
            return "A3";
        default:
            return "";
    }
}

export default checkSeatName;