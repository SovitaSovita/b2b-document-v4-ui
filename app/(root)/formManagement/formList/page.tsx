'use client'
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ListAllFormName } from '@/app/service/FormManagement';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/service/Redux/store/store';
import LoadingCustom from '@/app/components/Material/Loading';
import {
    Button, Card, CardBody, CardFooter, Chip,
    Pagination, SortDescriptor, Table, TableBody,
    TableCell, TableColumn, TableHeader, TableRow,
    useDisclosure
} from "@nextui-org/react";
import { getFormDetail } from '@/app/service/Redux/formDetailSlice';
import Link from 'next/link';
import getRandomColor from '@/app/utils/RandomColor';
import '../../../style/card_style.css'
import { Category, Clipboard, DocumentText, Element4, Grid5, HuobiToken, Task, UserSquare } from 'iconsax-react';
import NewFormModal from '@/app/components/Modal/NewFormModal';
interface Form {
    id: number;
    formName: string;
    formContent: string;
    username: string;
    status: number;
    createDate: string;
    formDescription: string;
    classification: string;
}

interface ApiResponse {
    data?: {
        rec: Form[];
    };
}
const INITIAL_VISIBLE_COLUMNS = ["documentName", "role", "status", "actions"];

const Page: React.FC = () => {
    const session = useSelector((state: RootState) => state?.article.session);

    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [viewType, setViewType] = useState<'grid' | 'table'>('grid');
    // Header table
    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "Document Name", uid: "documentName", sortable: true },
        { name: "Description", uid: "role", sortable: true },
        { name: "Document Type", uid: "status", sortable: true },
    ];

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS);
    // const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const fetchForms = async () => {
        setLoading(true);
        try {
            const response = await ListAllFormName({
                userId: session?.userId,
                status: 0,
            }) as ApiResponse;
            setForms(response?.data?.rec ?? []);
        } catch (error) {
            console.error('Error fetching forms:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) fetchForms();
    }, [session]);

    const pages = Math.ceil(forms.length / rowsPerPage);

    const filteredItems = useMemo(() => {
        let filteredForms = [...forms];

        if (hasSearchFilter) {
            filteredForms = filteredForms.filter((form) =>
                form.classification.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredForms;
    }, [forms, filterValue]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const headerColumns = useMemo(() => {
        // if (visibleColumns === "all") return columns;

        return columns.filter((column) => visibleColumns.includes(column.uid));
    }, [visibleColumns]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Form] as number;
            const second = b[sortDescriptor.column as keyof Form] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((form: Form, columnKey: React.Key) => {
        const cellValue = form[columnKey as keyof Form];
        switch (columnKey) {
            case "documentName":
                return <div>{form.formName}</div>;
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{form.formDescription}</p>
                    </div>
                );
            case "status":
                return (
                    <>
                        <p className="text-bold text-tiny capitalize text-default-500">{form.classification}</p>
                    </>
                );
            default:
                return cellValue;
        }
    }, []);

    const dispatch = useDispatch();

    const handleCardClick = (form: Form) => {
        console.log(form);
        dispatch(getFormDetail(form))
    };
    const handleRowClick = (item: Form) => {
        console.log('Row clicked:', item);
        dispatch(getFormDetail(item))
    };

    //open new form modal
    const { isOpen, onOpen, onClose }: any = useDisclosure();
    const handleNewFormClick = () => {
        onOpen();
    };

    const handleViewTypeChange = (viewType: 'grid' | 'table') => {
        setViewType(viewType);
    };


    const topContent = useMemo(() => (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    {/* <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search by name..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    /> */}
                    <div className="flex gap-3">
                        {/* Add additional controls if needed */}
                    </div>
                </div>
            </div>
        </>

    ), [
        filterValue,
        // statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        forms.length,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => (
        <div className="py-2 px-2 flex justify-between items-center">
            <Pagination
                showControls
                classNames={{
                    cursor: "bg-foreground text-background",
                }}
                color="default"
                isDisabled={hasSearchFilter}
                page={page}
                total={pages}
                variant="light"
                onChange={setPage}
            />
        </div>
    ), [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const formsWithColors = forms.map(form => ({
        ...form,
        bgColor: getRandomColor(),
    }));
    const renderGrid = () => (
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
            {formsWithColors.map((item) => (
                <div key={item?.id}>
                    <Link href={`/formManagement/requestApproval`} onClick={() => handleCardClick(item)}
                    >
                        <Card
                            className='border w-full rounded-lg'
                            shadow="none"
                        >
                            <CardBody className="overflow-visible p-0">
                                <div className='folded-corner p-2 h-[140px]' style={{ backgroundColor: item.bgColor }}>
                                    <p className='text-white text-xs'>
                                        <Chip
                                            startContent={item.status != 2 ? <Clipboard size={14} /> : <UserSquare size={14} />}
                                            variant="flat"
                                            color="secondary"
                                            size='sm'
                                        >
                                            {item.status == 2 ? "User" : "Pre"}
                                        </Chip>
                                    </p>

                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <Element4
                                                size={70}
                                                className='opacity-15 transform rotate-12 hover:scale-110 transition-all'
                                            />
                                        </div>
                                        <DocumentText
                                            size={150}
                                            className='opacity-15 transform rotate-12 hover:scale-110 transition-all' />
                                    </div>
                                </div>
                                {/* https://cdn.monday.com/images/quick_search_recent_doc.svg */}
                                {/* https://cdn.monday.com/images/quick_search_recent_board.svg */}
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <div className='w-3/4'>
                                    <div className='text-title font-semibold text-lg  flex items-center '>
                                        <DocumentText size={20} className='text-gray-500' />
                                        <p className='ml-2 line-clamp-1'>{item?.formName}</p>
                                    </div>

                                    <div className='mt-4 h-10 flex items-center'>
                                        <HuobiToken size={20} className='text-gray-500 mr-2' />
                                        <p className="text-left  mt-1 text-default-500 line-clamp-2">{item?.formDescription}</p>
                                    </div>
                                </div>
                                <div className='mt-2 self-start'>
                                    <p className="text-default-500 text-xs">{item?.classification}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                </div>
            ))
            }
        </div >
    );

    const renderTable = () => (
        <div className='p-4'>
            <Table
                isCompact
                removeWrapper
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={
                    <div className="py-2 px-2 flex justify-between items-center">
                        <Pagination
                            showControls
                            classNames={{ cursor: "bg-foreground text-background" }}
                            color="default"
                            isDisabled={!!filterValue}
                            page={page}
                            total={pages}
                            variant="light"
                            onChange={setPage}
                        />
                    </div>
                }
                checkboxesProps={{ classNames: { wrapper: "after:bg-foreground after:text-background text-background" } }}
                sortDescriptor={sortDescriptor}
                topContent={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between gap-3 items-end">
                            {/* Search Input can be re-added here */}
                        </div>
                    </div>
                }
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No forms found"} items={sortedItems}>
                    {sortedItems.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={headerColumns.length}>No forms found</TableCell>
                        </TableRow>
                    ) : (
                        sortedItems.map((item) => (
                            <TableRow onClick={() => handleRowClick(item)} className="cursor-pointer hover:bg-accent-hover">
                                {headerColumns.map((column) => (

                                    <TableCell key={column.uid}>
                                        <Link key={item.id} href="/formManagement/requestApproval" passHref>
                                            {renderCell(item, column.uid as keyof Form)}
                                        </Link>

                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className='p-4 font-Poppins'>
            <div className="flex justify-between items-center">
                <div className="">
                    <Button
                        onPress={handleNewFormClick}
                        startContent={<Grid5 size={18} />}
                        className='rounded-lg' color='secondary'>
                        New Form
                    </Button>
                </div>
                <div className='w-20 flex justify-around'>
                    <Button
                        isIconOnly
                        size='sm'
                        className={viewType == "grid" ? 'bg-secondary text-base-100' : 'text-gray-700'}
                        onClick={() => handleViewTypeChange('grid')}
                    >
                        <Category size={18} variant={viewType == "grid" ? 'Bold' : 'Linear'} />
                    </Button>
                    <Button
                        isIconOnly
                        size='sm'
                        className={viewType == "table" ? 'bg-secondary text-base-100' : 'text-gray-700'}
                        onClick={() => handleViewTypeChange('table')}
                    >
                        <Task size={18} variant='Linear' />
                    </Button>
                </div>
            </div>
            <hr style={{ width: '12px' }} />
            <br />
            {
                loading ? (
                    <LoadingCustom />
                ) : (
                    viewType === 'grid' ? renderGrid() : renderTable()
                )
            }

            <NewFormModal isOpen={isOpen} onClose={onClose} />
        </div >
    );
};

export default Page;
