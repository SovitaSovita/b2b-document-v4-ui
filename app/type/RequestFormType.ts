interface FormItem {
    id: number;
    itemName: string;
    inputRequire: boolean;
    inputType: string;
    inputValue: string;
    selected: boolean;
}

interface Rec {
    id: number;
    classification: string;
    formName: string;
    formDescription: string;
    formContent: string;
    formNumber: string;
    isItem: string;
    itemsData: FormItem[];
    fileId: string;
    username: string;
    status: number;
    createDate: string;
}

interface Payload {
    rec: Rec;
    message: string;
    code: string;
    error: boolean;
}