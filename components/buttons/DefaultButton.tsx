import clsx from "clsx";
import Link from "next/link";
import { CustomButtonProps } from "./button.type";
import { Button } from "@nextui-org/button";

export type DefaultButtonProps = CustomButtonProps & {
    size?: 'sm' | 'md' | 'lg'
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
    text,
    size,
    link,
    onClickButton,
    customClassName,
    ...props
}) => {
    return (
        <Button
            className={clsx(
                'font-interTight pt-2 pb-2 pl-3 pr-3 rounded-full text-oppositeText bg-primaryColor select-none whitespace-nowrap',
                'transition-all duration-200',
                'sm:hover:opacity-[0.5]',
                'active:opacity-[0.5] sm:active:opacity',
                customClassName
            )}
            onPress={onClickButton}
            {...props}
            size={size}
        >
            {text}
        </Button>
    );
}

export default DefaultButton;