import { useId, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export interface FileInputProps {
  onChange?: (file?: File) => void
  name?: string
}

export default function FileInput({
  onChange,
  name,
}: FileInputProps): JSX.Element {
  const id = useId()
  const [fileName, setFileName] = useState<string>()

  const handleUpload = (newFile?: File): void => {
    if (onChange) onChange(newFile)
    setFileName(newFile?.name)
  }

  const handleClear = (): void => {
    if (onChange) onChange()
    setFileName(undefined)
    const input = document.getElementById(id) as HTMLInputElement
    input.value = ''
  }

  return (
    <div className="w-full rounded bg-white text-black flex relative">
      <label htmlFor={id} className="cursor-pointer w-full h-full m-2">
        {fileName ?? 'Upload Image'}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        className="hidden"
        onChange={(event) => handleUpload(event.target.files?.[0])}
      />
      {!!fileName && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="clearFile"
          className="text-red-600 absolute top-1 right-1 rounded-full transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-20 h-8 w-8 flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </div>
  )
}
