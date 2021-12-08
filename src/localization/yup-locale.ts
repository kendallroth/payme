// @ts-nocheck (to ignore typechecking on validation function parameters)

/**
 * Validation Error
 *
 * Example:
 *   {
 *       key: 'common:validations.stringMin',
 *       values: { min: 2 }
 *   }
 *
 * Assume that the key maps into the following tokenized error message
 *   'Must be at least {{min}} characters'
 *
 * Then the final error message will be
 *   'Must be at least 2 characters'
 *
 * Source: https://github.com/react-hook-form/react-hook-form/discussions/3808#discussioncomment-261851
 * Source: https://github.com/nareshbhatia/form-examples/blob/main/checkout-form-rhf/src/models/ValidationError.ts
 */
export interface IValidationError {
  /** Key in translation files */
  key: string;

  /** Yup message interpolation values */
  values?: {
    [key: string]: any;
  };
}

/**
 * Custom localization dictionary for Yup (results in keys for i18next)
 *
 * Source: https://github.com/jquense/yup#using-a-custom-locale-dictionary
 */
export const yupLocale = {
  mixed: {
    default: ({ path }) => ({
      key: "common:validations.invalid",
      values: { path },
    }),
    required: ({ path }) => ({
      key: "common:validations.required",
      values: { path },
    }),
    notType: ({ path, type }) => ({
      key: "common:validations.invalidType",
      values: { path, type },
    }),
  },
  string: {
    matches: ({ path }) => ({
      key: "common:validations.match",
      values: { path },
    }),
    min: ({ path, min }) => ({
      key: "common:validations.stringMin",
      values: { path, min },
    }),
  },
  number: {},
  boolean: {},
};

/* eslint @typescript-eslint/explicit-function-return-type: off  */
