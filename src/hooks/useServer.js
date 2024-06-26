import {useState} from "react";
// import { saveAs } from "file-saver";

const useServer = () => {

//     const savejson = (type, user, order) => {                                 ///new
//         const handleDownload = () => {
//         const filecheck = new Blob([JSON.stringify({
//             category: type,
//             user_name: user?.username,
//             user_id: user?.id.toString(),
//             order: order
//         })
//     ], {type: 'json'});
//     saveAs(filecheck, 'debug.json');          
//     };
    
//     return ({handleDownload});  
// };  
//     const jsonstring =(type, user, order) =>    {
//         const debugstring = JSON.stringify({
//             category: type,
//             user_name: user?.username,
//             user_id: user?.id.toString(),
//             order: order
//         })
//         return debugstring
//     };

    const [error, setError] = useState(null);

    const sendNewOrder = async (type, user, order) => {
        // const url = 'https://berryaudit.ru/api/TelegramHonessy/InputTest?input=type__'+type+'username__'+user?.username+'userid__'+user?.id.toString()+'_____'+JSON.stringify(order);
        const url = 'https://honessi-production.up.railway.app/api/TelegramHonessy/IWanaParce'; //   https://webhook.site/b3ef360e-8da5-4816-8682-44c14c134621
        try {
            const response = await fetch(url, {
                method: "POST",
                // mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                    body: JSON.stringify({category: type, user_name: user?.username, user_id: user?.id.toString(), order: order})
                    // body: JSON.stringify({category: type, user_name: user?.username, user_id: user?.id.toString(), order: order})
                    });

            const result = await response.json();
            return {order_id: result.order_id}

        } catch (error) {
            setError(error);
            return {
                order_id: ''
            }
        }
    };

    return {sendNewOrder,error};

}
export default useServer;
