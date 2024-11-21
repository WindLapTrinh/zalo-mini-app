import { useCallback } from "react";
import axiosClient from "../config/axios"; 
import { Payment } from "zmp-sdk";

const usePayment = () => {
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "";
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handlePayment = useCallback(async (selectedReg) => {
    if (selectedReg) {
      const parsedJsonContent = (selectedReg || "{}");
      const payId = parsedJsonContent.Guid;
      const remainingAmount = parsedJsonContent.Remaining;
      const dateReg = parsedJsonContent.RegisterDate;
      const studentName = parsedJsonContent.StudentName;
      const id = parsedJsonContent.Id; // Assuming `id` is part of `parsedJsonContent`
      const orderId = parsedJsonContent.OrderId; // Assuming `orderId` is part of `parsedJsonContent`
      const desc = `Học viên ${studentName} thanh toán - phiếu đăng ký ngày ${dateReg} - còn nợ ${formatCurrency(remainingAmount)}`;

      console.log("id thanh toan", payId);
      console.log("so tien thanh toan", remainingAmount);

      Payment.createOrder({
        desc,
        item: [{ id: payId, amount: remainingAmount }],
        id: payId,
        amount: remainingAmount,
        extradata: {
          storeName: studentName,
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
              `RegisterForm/MiniAppPay?&guid=${payId}&money=${remainingAmount}`
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
    }

    console.log("Click");
  }, []);

  return { handlePayment };
};

export default usePayment;
