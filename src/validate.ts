import schema, { RuleItem, Rules, ValidateOption } from 'async-validator'
import * as helper from './helper'

export type ValidateRules = Rules
export type ValidateRuleItem = RuleItem

export interface ValidateData {
  [key: string]: any
}

export interface ValidateError {
  field?: string
  message?: string
}

export const optional = (_: RuleItem, value: any) => {
  return !(!helper.isNil(value) && helper.isEmpty(value))
}

export default async (
  rules: ValidateRules,
  data: ValidateData,
  option?: ValidateOption
): Promise<ValidateError | void> => {
  if (helper.isEmpty(rules)) {
    return
  }

  const validator = new schema(rules)

  try {
    await validator.validate(data, {
      first: true,
      suppressWarning: true,
      ...option
    })
  } catch ({ errors }) {
    return errors[0]
  }
}
