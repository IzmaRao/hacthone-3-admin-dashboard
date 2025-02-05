import { Rule } from 'sanity'
export const customer = {
    name: 'customers',
    type: 'document',
    title: 'Customer',
    fields: [
        {
          name: 'customerId',
          title: 'Customer ID',
          type: 'number',
          validation: (Rule: Rule) => Rule.required().min(1).error('Customer ID must be a positive number.'),
        },
        {
          name: 'firstName',
          title: 'First Name',
          type: 'string',
          validation: (Rule: Rule) => Rule.required().error('First name is required.'),
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
          validation: (Rule: Rule) => Rule.required().error('Last name is required.'),
        },
        {
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          options: {
            isHighlighted: true, // This will highlight the field in the studio
          },
        },
        {
          name: 'address',
          title: 'Address',
          type: 'string',
          validation: (Rule: Rule) => Rule.required().error('Address is required.'),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule: Rule) => Rule.required().error('City is required.'),
        },
        {
          name: 'zipCode',
          title: 'Zip Code',
          type: 'number',
          validation: (Rule: Rule) => Rule.required().min(1).error('Zip code must be a positive number.'),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'number',
          validation: (Rule: Rule) => Rule.required().min(1).error('Phone number must be a positive number.'),
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule: Rule) => Rule.required().email().error('A valid email is required.'),
        },
        {
          name: 'additionalInformation',
          title: 'Additional Information',
          type: 'text',
          options: {
            rows: 3, // Number of rows for the text area
          },
        },
      ],
};