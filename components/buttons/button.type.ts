import { Button } from "@nextui-org/button"
import { ComponentProps } from "react"

export type CustomButtonProps = ComponentProps<typeof Button> & {
    text: string
    link?: string
    onClickButton?: () => void
    customClassName?: string
    available?: boolean
}