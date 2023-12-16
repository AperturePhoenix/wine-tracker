import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export default function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
): JSX.Element {
  return <input className="rounded p-2 text-black" type="text" {...props} />
}
