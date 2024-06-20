import { Grid, type GridProps, TextField, type TextFieldProps } from "@mui/material"

export type GridTextFieldProps = {
  xs?: GridProps["xs"]
  gridProps?: GridProps
} & TextFieldProps

export default function GridTextField({ xs = 3, gridProps, ...textFieldProps }: GridTextFieldProps): JSX.Element {
  return (
    <Grid item xs={xs} {...gridProps}>
      <TextField fullWidth {...textFieldProps} />
    </Grid>
  )
}
