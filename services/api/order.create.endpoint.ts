import { OrderCreateFormData } from "@/components/forms/OrderCreateForm/order_create_form_data"
import axios from "axios"

export type ApiOrderCreateParams = {
    data: OrderCreateFormData
}

export type ApiOrderCreateResponse = {
    data?: any
}

export const orderCreateApi = async ({
    data
}: ApiOrderCreateParams): Promise<ApiOrderCreateResponse> => {
    try {
        const response = await axios.post('https://order.drcash.sh/v1/order', {
            stream_code: 'vv4uf',
            client: {
                phone: data.phone,
                name: data.name,
            },    
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer RLPUUOQAMIKSAB2PSGUECA'          
            }
        });
    
        return {data: response.data};
    } catch (error) {
        return {};
    }
}