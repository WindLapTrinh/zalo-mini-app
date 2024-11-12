// src/shared/utils/formatUtils.js
import { format } from 'date-fns'; // You can install date-fns using npm or yarn

// Format date as DD/MM/YYYY
export const formatDate = (date) => {
  if (!date) return 'N/A';
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'N/A';
  }
};

// Format currency as VND (Vietnamese Dong)
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '0 đ';
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return '0 đ';
  }
};
