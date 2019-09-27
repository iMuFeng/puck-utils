import validate from '../src/validate'

test('invalid rule', async () => {
  const error = await validate({
    name: [
      { required: true, message: 'invalid_name' }
    ]
  }, {
    name: ''
  })
  expect(error).toStrictEqual({
    field: 'name',
    error: 'invalid_name'
  })
})

test('valid rule', async () => {
  const error = await validate({
    name: {
      type: 'object',
      message: 'invalid_name',
      required: true,
      fields: {
        firstName: [
          { required: true, message: 'invalid_first_name' }
        ],
        lastName: [
          { required: true, message: 'invalid_last_name' }
        ]
      }
    },
    age: [
      { type: 'enum', enum: [1, 5] }
    ]
  }, {
    name: {
      firstName: 'Jack',
      lastName: 'Chen'
    },
    age: 1
  })
  expect(error).toBe(undefined)
})