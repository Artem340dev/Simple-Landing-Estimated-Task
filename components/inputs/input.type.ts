export type CustomInputProps = React.HTMLProps<HTMLInputElement> & {
    placeholder?: string
    customClassName?: string
    inputClassName?: string
    fullBordered: boolean
    handleChange?: (value: string) => void
}