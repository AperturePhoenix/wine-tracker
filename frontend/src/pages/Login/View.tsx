import Input from '@Components/Input'
import Password from '@Components/Password'
import { FormEvent } from 'react'

export default function LoginView(): JSX.Element {
  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    alert('Submitted')
  }

  return (
    <form
      className="flex flex-col h-full w-full justify-center items-center space-y-2"
      onSubmit={onSubmit}
    >
      <Input placeholder="Username" type="text" required minLength={4} />
      <Password placeholder="Password" required minLength={4} />
      <button type="submit" className="text-lg">
        Login
      </button>
    </form>
  )
}
