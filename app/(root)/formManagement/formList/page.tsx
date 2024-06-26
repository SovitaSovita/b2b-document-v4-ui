'use client'
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ListAllFormName } from '@/app/service/FormManagement';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/service/Redux/store/store';
import LoadingCustom from '@/app/components/Material/Loading';
import {
    Button, Card, CardBody, CardFooter, CardHeader, Chip, ChipProps,
    Image,
    Input, Pagination, SortDescriptor, Table, TableBody,
    TableCell, TableColumn, TableHeader, TableRow
} from "@nextui-org/react";
import { SearchIcon } from '@/public/icon/TableIcon';
import Link from 'next/link';
import { getFormDetail } from '@/app/service/Redux/formDetailSlice';

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

type User = Form;
const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["documentName", "role", "status", "actions"];

const Page: React.FC = () => {
    const session = useSelector((state: RootState) => state?.article.session);
    console.log('user', session?.userId);


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

    const statusOptions = [
        { name: "Active", uid: "active" },
        { name: "Paused", uid: "paused" },
        { name: "Vacation", uid: "vacation" },
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
                userId: 'vimean',
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
        fetchForms();
    }, []);

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

    const classNames = useMemo(() => ({
        wrapper: ["max-h-[382px]", "max-w-3xl"],
        th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
        td: [
            "group-data-[first=true]:first:before:rounded-none",
            "group-data-[first=true]:last:before:rounded-none",
            "group-data-[middle=true]:before:rounded-none",
            "group-data-[last=true]:first:before:rounded-none",
            "group-data-[last=true]:last:before:rounded-none",
        ],
    }), []);

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
        console.log("object")
        dispatch(getFormDetail(form))
    };
    const handleRowClick = (item: Form) => {
        console.log('Row clicked:', item);
    };
    const handleNewFormClick = () => {
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
        //statusFilter,
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

    const renderGrid = () => (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {forms.map((form) => (
                <div key={form.id}>
                    <Link href={`/formManagement/requestApproval?id=${form.id}`}> {/* Pass form.id as a query parameter */}
                        <a className="cursor-pointer" onClick={() => handleCardClick(form)}>
                            <Card className="py-4 shadow-none border cursor-pointer">
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <h2 className="font-bold text-lg">{form.formName}</h2>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <h5>{form.formContent}</h5>
                                </CardBody>
                                <CardFooter className="text-sm justify-between">
                                    <p className="text-gray-500">{form.classification}</p>
                                </CardFooter>
                            </Card>
                        </a>
                    </Link>
                </div>
            ))}
        </div>
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
                            <TableRow key={item.id} onClick={() => handleRowClick(item)} className="cursor-pointer hover:bg-accent-hover">
                                {headerColumns.map((column) => (
                                    <TableCell key={column.uid}>{renderCell(item, column.uid as keyof Form)}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>

            </Table>
        </div>
    );

    return (
        <div className='p-4'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Button className="btn-outline btn-sm" onClick={handleNewFormClick}>New Form</Button>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-vertical lg:menu-horizontal bg-base-100 rounded-box">
                        <li><a onClick={() => handleViewTypeChange('grid')}>Grid</a></li>
                        <li><a onClick={() => handleViewTypeChange('table')}>Table</a></li>
                    </ul>
                </div>
            </div>
            <hr style={{ width: '12px' }} />
            <br />
            {loading ? (
                <LoadingCustom />
            ) : (
                viewType === 'grid' ? renderGrid() : renderTable()
            )}
        </div>
    );
};

export default Page;
