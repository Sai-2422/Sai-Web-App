import { check } from "express-validator";

export const validateProductOrder = [
  check('userId').not().isEmpty().withMessage('User ID is required'),
  check('productId').not().isEmpty().withMessage('Product ID is required'),
  check('shippingInfo.address').not().isEmpty().withMessage('Shipping address is required'),
  check('shippingInfo.city').not().isEmpty().withMessage('City is required'),
  check('shippingInfo.state').not().isEmpty().withMessage('State is required'),
  check('shippingInfo.pincode').not().isEmpty().withMessage('Pincode is required'),
  check('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
  check('paymentId').not().isEmpty().withMessage('Payment ID is required'),
  check('orderId').not().isEmpty().withMessage('Order ID is required'),
  check('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
];
