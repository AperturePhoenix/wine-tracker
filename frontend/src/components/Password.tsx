import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

export default function Password(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
): JSX.Element {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        className="rounded p-2 text-black"
        type={visible ? 'text' : 'password'}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-label="togglePasswordVisibility"
        className="text-black absolute top-1 right-1 rounded-full transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-20 h-[2rem] w-[2rem] flex justify-center items-center"
      >
        <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />
      </button>
    </div>
  )
}
