'use client';

import DefaultButton from "@/components/buttons/DefaultButton";
import DefaultInput from "@/components/inputs/DefaultInput";
import { ApiOrderCreateParams, ApiOrderCreateResponse, orderCreateApi } from "@/services/api/order.create.endpoint";
import { addData } from "@/store/features/history/historySlice";
import { RootState } from "@/store/store";
import { Input } from "@nextui-org/react";
import { TypedUseQueryStateOptions } from "@reduxjs/toolkit/query/react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const createOrderQuery = (
    params: ApiOrderCreateParams,
    opts: Partial<UseQueryOptions<ApiOrderCreateResponse>> = {},
) => {
    return useQuery<ApiOrderCreateResponse>({
      queryKey: [],
      queryFn: () => orderCreateApi(params),
      ...opts,
    });
}

export type OrderCreateFormProps = React.HTMLProps<HTMLDivElement>

export const OrderCreateForm: React.FC<OrderCreateFormProps> = ({

}) => {
    const [phone, setPhone] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
    const [isFormSent, setIsFormSent] = useState<boolean>(false);

    const { history } = useSelector((state: RootState) => state.history);
    const dispatch = useDispatch();

    const formatPhoneNumber = (value: string) => {
        const cleaned = value.replace(/[^\d]/g, "");

        if (cleaned.length <= 10) {
        const match = cleaned.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

        if (match) {
            return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        }
        }
        return cleaned;
    };

    useEffect(() => {
        setName(prev => prev.charAt(0).toUpperCase() + (prev.substring(1)))
    }, [name]);
    
    const { isFetching, refetch } = createOrderQuery(
        {
            data: {
                phone: phone,
                name: name
            }
        }, {
            enabled: isQueryEnabled
        }
    );

    const [errors, setErrors] = useState({
        phone: '',
        name: '',
        response: ''
    });

    const handleChangePhone = (value: string) => {
        setPhone(formatPhoneNumber(value));

        if (value.replace(/[^\d]/g, "").length !== 11) {
            handleInputInvalid('phone', "Номер телефона должен содержать 10 цифр");
        } else {
            handleErrorResolved('phone');
        }
    }

    const handleInputInvalid = (field: string, text: string, e?: React.FormEvent<HTMLInputElement>) => {
        e?.preventDefault();
        setErrors(prev => ({
            ...prev,
            [field]: text
        }));
    }

    const handleErrorResolved = (field: string) => {
        setErrors(prev => ({
            ...prev,
            response: '',
            [field]: ''
        }));
    }

    const sendForm = () => {
        if (!Object.keys(history).includes(phone)) {
            setIsQueryEnabled(true);

            refetch()
                .then((response) => {
                    setIsFormSent(true);
                    dispatch(addData([phone, {phone, name}]));
                });
                
            setIsQueryEnabled(false);
        } else {
            setErrors(prev => ({
                ...prev,
                response: 'Вы уже оставили заявку!'
            }))
        }
    }

    return (
        <form 
            className={clsx(
                "w-1/4 bg-white p-4 rounded-md",
                'flex flex-col gap-4'
            )}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                sendForm();
            }}
        >
            <div className="flex flex-col">
                <p className="font-interTight font-semibold text-lg text-primaryText">Сделать заказ</p>
                <p className="font-interTight font-medium text-base text-secondaryText">Оставьте свои данные здесь</p>
            </div>
            <div className="flex flex-col gap-2">
                {!isFormSent &&
                    <>
                        <DefaultInput
                            placeholder='Введите ваш телефон'
                            customClassName={clsx(
                                'w-full'
                            )}
                            inputClassName='text-base'
                            fullBordered={true}
                            handleChange={handleChangePhone}
                            onInvalid={(e: React.FormEvent<HTMLInputElement>) => handleInputInvalid('phone', 'Заполните номер телефона!', e)}
                            onInput={(e: React.FormEvent<HTMLInputElement>) => handleErrorResolved('phone')}
                            value={phone}
                            type="phone"
                            required
                        />
                        <DefaultInput
                            placeholder='Введите вашe имя'
                            customClassName={clsx(
                                'w-full'
                            )}
                            inputClassName='text-base'
                            fullBordered={true}
                            handleChange={setName}
                            onInvalid={(e: React.FormEvent<HTMLInputElement>) => handleInputInvalid('name', 'Заполните имя!', e)}
                            onInput={(e: React.FormEvent<HTMLInputElement>) => handleErrorResolved('name')}
                            value={name}
                            required
                        />
                    </>
                }
                {isFormSent && 
                    <p className="font-interTight font-medium text-sm text-primaryText">Спасибо за заказ!</p>
                }
            </div>
            {Object.values(errors).filter(error => error.length > 0).length > 0 &&
                <div className="flex flex-col">
                    {Object.values(errors).filter(error => error.length > 0).map((error, index) =>
                        <p
                            key={index}
                            className={clsx(
                                'font-interTight font-semibold text-sm text-red-500'
                            )}
                        >{error}</p>
                    )}
                </div>
            }
            <DefaultButton
                text='Сделать заказ'
                customClassName='font-interTight font-semibold text-base text-center rounded-md'
                type='submit'
                isLoading={isFetching}
                isDisabled={phone.length == 0 || name.length == 0 || isFetching || isFormSent}
            />
        </form>
    );
}