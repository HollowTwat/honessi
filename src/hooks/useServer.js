import {
    useState
} from "react";

const useServer = () => {

    const [error, setError] = useState(null);

    const sendNewOrder = async (type, user, order) => {

        const url = 'https://berryaudit.ru/api/TelegramHonessy/InputTest?input=type'+type+'username'+user?.username+'userid'+user?.id.toString();
        try {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                // headers: {
                //     "Content-Type": "application/json",
                //     "Accept": "application/json",
                // },
                // body: JSON.stringify({
                    // category: type,
                    // user_name: user?.username,
                    // user_id: user?.id.toString(),
                    // order: order
                // })
            });

            const result = await response.json();
            return {
                order_id: result.order_id
            }

        } catch (error) {
            setError(error);
            return {
                order_id: ''
            }
        }
    }

    return {
        sendNewOrder,
        error
    };

}

export default useServer;
