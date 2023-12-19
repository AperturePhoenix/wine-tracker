import FileInput from '@Components/FileInput'
import Input from '@Components/Input'
import Main from '@Components/Main'
import { FormEvent } from 'react'

type FormInputs = { [key in keyof FormModel]: { value: FormModel[key] } }
interface FormModel {
  name: string
  producer: string
  type: string
  variety: string
  image: File
}

export default function AddWineView(): JSX.Element {
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    const target = event.target as typeof event.target & FormInputs
  }

  return (
    <Main>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col space-y-2"
      >
        <p className="text-2xl w-full text-center">Add Wine</p>
        <Input name="name" placeholder="Name" required />
        <Input name="producer" placeholder="Producer" required />
        <Input name="type" placeholder="Type" required />
        <Input name="variety" placeholder="Variety" required />
        <FileInput name="image" />
        <button type="submit" className="rounded bg-rose-400 py-1">
          Add
        </button>
      </form>
    </Main>
  )
}
