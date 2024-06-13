import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const data = await request.formData();
    const respData = data.get('RESP_DATA');
    console.log(data);

    // Use window.postMessage to send data back to the client
    return new NextResponse(JSON.stringify({
        type: 'message',
        data: {
            RESP_DATA: respData,
        },
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
