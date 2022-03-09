import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import { FieldErrors } from 'react-hook-form'

const FormRow: React.VFC<{
  id: string
  label?: string
  isRequired?: boolean
  helperText?: string
  errors?: FieldErrors
  labelStyle?: 'primary' | 'secondary'
  children: React.ReactNode
}> = ({
  id,
  label,
  isRequired = false,
  helperText,
  errors,
  labelStyle = 'primary',
  children,
}) => {
  const errorMessage = errors ? errors[id]?.message : undefined

  return (
    <>
      <FormControl
        id={id}
        marginTop="1rem"
        _first={{
          marginTop: '0rem',
        }}
        isRequired={isRequired}
        isInvalid={errorMessage}
      >
        {label && (
          <FormLabel
            htmlFor={id}
            css={labelStyle === 'secondary' ? styleFormLabelSecondary : ''}
          >
            {label}
          </FormLabel>
        )}
        {children}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    </>
  )
}

const styleFormLabelSecondary = css({
  fontWeight: 'normal',
  marginTop: '1rem',
  paddingLeft: '10px',
  borderLeft: '5px solid',
  borderColor: 'orange',
})

export default FormRow
