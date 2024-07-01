'use client'
import { RootState } from "@/app/service/Redux/store/store"
import { Button, DatePicker, Input, Radio, RadioGroup } from "@nextui-org/react"
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { DirectboxSend } from "iconsax-react";
import EditorBlockNote from "@/app/components/About/EditorBlockNote";

function Page() {
    const formData: Rec = useSelector((state: RootState) => state.form.form)
    const router = useRouter();
    useEffect(() => {
        if (!formData?.formName) {
            router.push('/formManagement/formList')
        }
    }, [formData?.formName])
    return (
        <>
            <div className="">
                <div className="mt-3 ml-4 mr-4 flex justify-between">
                    <Button size="sm"
                        variant="ghost"
                        className="border-none rounded-lg group"
                        onClick={() => router.back()}
                    >
                        <KeyboardReturnOutlinedIcon className="text-gray-600 text-base" />
                        <span>Go Back</span>
                    </Button>
                    <Button size="sm"
                        color="secondary"
                        className="border-none rounded-lg group"
                    >
                        <DirectboxSend size={18} />
                        <span>Request</span>
                    </Button>
                </div>
                <div className="mt-4 m-4 border p-4 rounded-lg">
                    <h1 className="text-title text-center font-semibold text-xl">{formData?.formName}</h1>
                    <div className="flex justify-between">
                        <span className="text-xs">Form number : {formData?.formNumber}</span>
                        <span className="text-xs">Form type : {formData?.classification}</span>
                    </div>

                    <div className="mt-6">
                        {formData?.itemsData.map((item: FormItem) => (
                            <div>
                                <div key={item.id} className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-4">
                                        {
                                            item.inputType == "text" &&
                                            <Input className="mb-2.5"
                                                value={item.inputValue}
                                                type={item.inputType}
                                                variant="flat"
                                                size="sm"
                                                label={item.itemName}
                                                isRequired={item.inputRequire} />
                                        }
                                        {
                                            item.inputType == "radio" && (
                                                <RadioGroup
                                                    size="sm"
                                                    orientation="horizontal"
                                                    label={item.itemName}
                                                    color="secondary"
                                                    className="mb-2"
                                                    defaultValue={item.selected ? item.inputValue : ''}
                                                >
                                                    <Radio value={item.inputValue}>{item.inputValue}</Radio>
                                                    <Radio value={item.inputValue}>{item.inputValue}</Radio>
                                                </RadioGroup>
                                            )
                                        }
                                        {
                                            item.inputType == "date" && (
                                                <DatePicker size="sm" label={item.itemName} className="max-w-[284px] mb-2" />
                                            )
                                        }
                                    </div>
                                    <div className="">2</div>
                                    <div className="">3</div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-6 border-t p-4">
                            <EditorBlockNote />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
