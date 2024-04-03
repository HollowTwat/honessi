const useCounterPosition = () => {

    const handleCountItems = (array) => {

        return array.reduce((accumulator, position) => {
            return accumulator + Number(position.total);
        }, 0);
    };

    const handleCountSum = (array) => {

        return array.reduce((accumulator, position) => {
            if (position.articlePrice && !isNaN(Number(position.total)) && !isNaN(Number(position.articlePriceData.price))) {
                return accumulator + (Number(position.total) * Number(position.articlePriceData.price));
            }
            return accumulator
        }, 0);
    };

    return {
        handleCountItems,
        handleCountSum
    }

}
export default useCounterPosition;