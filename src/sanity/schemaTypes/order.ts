
export const order =  {
  name: 'orders',
  type: 'document',
  title: 'Order',
  fields: [
    {
      name: 'orderId',
      type: 'string',
      title: 'Order ID',
    },
    {
      name: 'customerId',
      type: 'number',
      title: 'Customer ID',
    },
    {
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'number', title: 'Product ID' },
            { name: 'quantity', type: 'number', title: 'Quantity' },
          ],
        },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'string',
      title: 'Payment Status',
      options: {
        list: ['Paid', 'Pending', 'Failed'],
      },
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: ['Order Created', 'Shipped', 'Delivered', 'Cancelled'],
      },
    },
    {
      name: 'message',
      type: 'string',
      title: 'Message',
    },
  ],
};