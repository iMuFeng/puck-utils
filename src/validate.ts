import schema, { RuleItem, Rules } from 'async-validator'

import helper from './helper'

export type ValidateRules = Rules

export interface ValidateData {
  [key: string]: any
}

export interface ValidateError {
  field?: string
  error?: string
}

export const optional = (rule: RuleItem, value: any, callback: Function) => {
  let callbackValue: any

  if (!helper.isNil(value) && helper.isEmpty(value)) {
    callbackValue = new Error(rule.message)
  }

  callback(callbackValue)
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
