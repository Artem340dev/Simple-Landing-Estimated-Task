"use client";

import clsx from "clsx";
import { use, useEffect, useState } from "react";
import { CustomInputProps } from "./input.type";

export type DefaultInputProps = CustomInputProps;

const DefaultInput: React.FC<DefaultInputProps> = ({
    placeholder,
    customClassName,
    fullBordered,
    inputClassName,
    handleChange,
    ...props
}) => {
    const [value, setValue] = useState<string>((props.value?.toString() && props.value.toString()) || '');

    const clearInput = () => {
        setValue('');
        handleChange && handleChange('');
    }

    return (
        <div className={clsx(
            'inline-flex flex-row items-center gap-2',
            'pl-[10px] pr-[10px] pt-[5px] pb-[5px]',
            !fullBordered && 'border border-[transparent] border-b-borderColor',
            fullBordered && 'border border-borderColor rounded-md',
            'transition-all duration-200',
            customClassName
        )}>
            <input 
                placeholder={placeholder}
                value={value}
                className={clsx(
                    'bg-[transparent] appearance-none outline-none text-primaryText placeholder-secondaryText w-[100%]',
                    inputClassName
                )}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.value);
                        handleChange && handleChange(event.target.value);   
                }}
                {...props}
            />
            <p
                className={clsx(
                    'font-interTight font-medium text-md text-secondaryText select-none',
                    'transition-all duration-200',
                    'active:opacity-[0.5] sm:active:opacity sm:hover:opacity-[0.5]',
                    value.length > 0 ? 'pointer' : 'opacity-[0] pointer-events-none'
                )}
                onClick={clearInput}
            >
                ×
            </p>
        </div>
    );
}

export default DefaultInput;