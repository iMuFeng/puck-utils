import schema, { RuleItem, Rules } from 'async-validator'
import helper from './helper'

export type ValidateRules = Rules
export type ValidateRuleItem = RuleItem

export interface ValidateData {
  [key: string]: any
}

interface ValidateError {
  field?: string
  message?: string
}

export const optional = (_: RuleItem, value: any) => {
  return !(!helper.isNil(value) && helper.isEmpty(value))
}

export default async (rules: ValidateRules, data: ValidateData): Promise<ValidateError | void> => {
  if (helper.isEmpty(rules)) {
    return
  }

  const validator = new schema(rules)

  try {
    await validator.validate(data, { first: true })
  } catch ({ errors }) {
    return errors[0]
  }
}
