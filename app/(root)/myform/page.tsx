'use client'
import React, { useState } from 'react'
import image from '../myform/K.O.S.I.G.N-CAMBODIA-INVESTMENT-CO.-LTD-300x300.webp'
import { Button, DatePicker, Table, TableColumn, TableHeader, Textarea, TimeInput } from '@nextui-org/react'
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { parseAbsoluteToLocal, Time, ZonedDateTime } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Input } from "@nextui-org/react";

function Page() {
    let [value, setValue] = React.useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));

    let formatter = useDateFormatter({ dateStyle: "short", timeStyle: "long" });
    return (
        <div>
            <h1 style={{ fontWeight: 'bold', textAlign: "center", marginTop: '19px' }}>Submit an OverTime Request</h1>
            <div style={{ marginLeft: '15px', width: '250px' }}>
                <DatePicker
                    label="Date"
                    variant="bordered"
                    className="max-w-[284px]"
                    showMonthAndYearPickers
                />
            </div>
            <div className="w-full flex flex-row gap-2" style={{ marginRight: '15px', marginLeft: '15px', marginTop: '20px', width: '350px' }}>
                <div>
                    <TimeInput
                        labelPlacement="outside"
                        defaultValue={new Time(11, 45)}
                    />
                </div>
                <TimeInput
                    labelPlacement="outside"
                    defaultValue={new Time(11, 45)}
                />
                <div>
                    <p style={{ whiteSpace: 'nowrap', marginTop: '10px' }}>
                        1 hour 2 minutes
                        {/* {value instanceof ZonedDateTime
                            ? (value.toDate && formatter.format(value.toDate())) ||
                            (value && value.toString()) ||
                            "--"
                            : ""} */}
                    </p>

                </div>


            </div>
            <div>
                <input style={{ marginTop: '20px', marginLeft: '15px', borderRadius: '5px', width: '250px', height: '35px', backgroundColor: '#eee' }}></input>
                <div>
                    <p style={{ marginTop: '20px', marginLeft: '15px' }}>
                        In days or fraction of days (e.g. 0.125 for 1h if you work 8h/day).
                    </p>
                </div>
                <div style={{ marginLeft: '15px', marginTop: '20px' }}>Reason</div>
                <textarea style={{ border: '1px solid black', marginTop: '5px', marginLeft: '15px', borderRadius: '5px', width: '250px', height: '35px' }}>
                </textarea>
                <div style={{ marginLeft: '15px', }}>Status</div>
            </div>
            <select className="select select-neutral select-sm select-bordered w-full ml-3 max-w-40" style={{ marginTop: "auto 10px" }}>
                <option value={0}>Requested</option>
                <option value={2}>Planned</option>
            </select>
            <div>
                <div>
                    <Button color="primary" style={{ backgroundColor: '#3097d1', marginTop: "15px", marginLeft: '15px', width: '150px' }}>
                        Request overTime
                    </Button>
                    
                    
                </div>
            </div>
        

            {/* <div className="flex flex-row gap-2" style={{ marginRight: '15px', marginLeft: '15px', marginTop: '20px', width: '180px' }}>
                <div className="w-full flex flex-col gap-y-2">
                    <DatePicker className="max-w-[284px]" label="Date (controlled)" value={value} onChange={setValue} />
                    <p className="text-default-500 text-sm">
                        Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
                    </p>
                </div>
                <DatePicker className="max-w-[284px]" defaultValue={parseDate("2024-04-04")} label="Date (uncontrolled)" />
            </div> */}



            {/* <Input
             type="email" 
             label="Email" 
             style={{width:'10px'}}
             /> */}

            {/* <div className="flex flex-col">
                <DatePicker label="Date" id="date" />
            </div> */}





        </div>


    )
}

export default Page