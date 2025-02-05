export const product = {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Product Name',
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'price',
            type: 'number',
            title: 'Product Price',
        },
        {
            name: 'tags',
            type: 'array',
            title: 'Product Tags',
            of: [{ type: 'string' }]
        },
        {
            name: 'width',
            type: 'number',
            title: 'Product Width',
        },
        {
            name: 'height',
            type: 'number',
            title: 'Product Height',
        },
        {
            name: 'image',
            type: 'string',
            title: 'Image'
        },
        {
            name: 'rating',
            type: 'number',
            title: 'Rating',
            description: 'Rating of the product'
        },
        {
            name: 'stockQuantity',
            type: 'number',
            title: 'Stock Quantity'
        },
        {
            name: 'id',
            type: 'number',
            title: 'Product ID',
        },
        {
            name: 'discountPercentage',
            type: 'number',
            title: 'Discount Percentage',
        },
        {
            name: 'isFeaturedProduct',
            type: 'boolean',
            title: 'Is Featured Product',
        },
        {
            name: 'catogory',
            type: 'string',
            title: 'Catogory',
        },
    ]
};