import { useCallback } from 'react';
import {axiosClient} from '../config/axios'; 

const usePayment = () => {
  const createOrder = useCallback(async ({dateOrder, money, payId, id, orderId, desc }) => {
    try {
      await Payment.createOrder({
        desc: `Thanh toán - đơn hàng ngày ${dateOrder} - còn nợ ${formatCurrency(
          money
        )}`,
        item: [{ id: payId, amount: money }],
        id: payId,
        amount: money,
        extradata: {
          storeId: id,
          orderGroupId: orderId,
          myTransactionId: "2388317336306541214",
          notes: desc,
        },
        success: async (data) => {
          const { orderId } = data;
          console.log(orderId);

          try {
            const res = await axiosClient.post(
              `RegisterForm/MiniAppPay?&guid=${id}&money=${money}`
            );
            console.log("dữ liệu success", res);
          } catch (error) {
            console.error("kết nối server không thành công:", error);
          }
        },
        fail: (err) => {
          console.log(err);
        },
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }, []);

  return { createOrder };
};

export default usePayment;
