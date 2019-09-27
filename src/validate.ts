import schema, { Rules } from 'async-validator'

import helper from './helper'

export type ValidateRules = Rules

export interface ValidateData {
  [key: string]: any
}

export interface ValidateError {
  field?: string
  error?: string
}

export default async (rules: ValidateRules, data: ValidateData): Promise<ValidateError | void> => {
  if (helper.isEmpty(rules)) {
    return
  }

  const validator = new schema(rules)

  try {
    await validator.validate(data, { first: true })
  } catch ({ errors }) {
    return {
      field: errors[0].field,
      error: errors[0].message
    }
  }
}
