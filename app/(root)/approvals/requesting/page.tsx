'use client';
import React, { useEffect, useState } from "react";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { ListAllFormName } from "@/app/service/FormManagement";
// import { capitalize } from "@/app/service/NextUiUtil";
// import { ChevronDownIcon, PlusIcon, SearchIcon } from "@/public/icon/TableIcon";
import LoadingCustom from "@/app/components/Material/Loading";

interface User {
    id: number;
    name: string;
    role: string;
    status: string;
    formName: string;
    writer: string;
    department: string;
    createDate: string;
    type: string;
    attachment: string;
}


const INITIAL_VISIBLE_COLUMNS: string[] = ["name", "role", "status", "writer", "department", "createDate", "type", "attachment"];

const Page: React.FC = () => {
    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "Document name", uid: "name", sortable: true },
        { name: "Document number", uid: "role", sortable: true },
        { name: "Title", uid: "status", sortable: true },
        { name: "Writer", uid: "writer", sortable: true },
        { name: "Department", uid: "department", sortable: true },
        { name: "Creation date", uid: "createDate", sortable: true },
        { name: "Type", uid: "type", sortable: true },
        { name: "Attachment ", uid: "attachment", sortable: true }
    ];

    const [users, setUsers] = useState<User[]>([]);
    const [filterValue, setFilterValue] = useState<string>("");
    const [visibleColumns, setVisibleColumns] = useState<string[]>(INITIAL_VISIBLE_COLUMNS);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortDescriptor, setSortDescriptor] = useState<{ column: keyof User; direction: "ascending" | "descending" }>({
        column: "id",
        direction: "ascending",
    });
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        setIsLoading(true);
        ListAllFormName({
            userId: 'vimean',
            status: 0,
        }).then((response) => {
            if (response && response.data) {
                setUsers(response.data.rec ?? []);
            }
        }).catch((error) => {
            console.error("Error fetching forms:", error);
        }).finally(() => {
            setIsLoading(false); 
        });
    };

    const headerColumns = visibleColumns.map(columnKey => columns.find(col => col.uid === columnKey)).filter(Boolean);

    const filteredItems = users.filter(user =>
        (!filterValue || user.name.toLowerCase().includes(filterValue.toLowerCase())) &&
        (statusFilter.length === 0 || statusFilter.includes(user.status))
    );

    const sortedItems = [...filteredItems].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    const renderCell = (user: User, columnKey: keyof User) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "name":
                return <div>{user.name}</div>;
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{user.role}</p>
                        <p className="text-bold text-tiny capitalize text-default-500">{user.formName}</p>
                    </div>
                );
            case "status":
                return (
                    <>
                        <p>{user.status}</p>
                    </>
                );
            case "writer":
                return (
                    <>
                        <p>sarayuth</p>
                    </>
                );
            case "department":
                return (<><p>B2B</p></>)
            default:
                return String(cellValue); // Ensure it's converted to string if needed
        }
    };

    const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    };

    const onSearchChange = (value: string) => {
        setFilterValue(value);
        setPage(1);
    };

    const topContent = (
        <div className="flex flex-col gap-4">
            {/* <Input
                className="w-[132px]"
                icon={<SearchIcon />}
                onClearClick={() => onSearchChange("")}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search"
                value={filterValue}
            /> */}
            {/* <Dropdown
                className="w-[180px]"
                icon={<ChevronDownIcon />}
                placeholder="Filter by Status"
                value={statusFilter}
                onChange={(value) => setStatusFilter(value as string[])}
            >
                <DropdownTrigger>
                    <Button>Filter</Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {statusOptions.map(option => (
                        <DropdownItem key={option.uid} value={option.uid}>
                            {option.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown> */}
        </div>
    );

    const bottomContent = (
        <div className="py-2 px-2 flex justify-between items-center">
            <Pagination
                showControls
                classNames={{
                    cursor: "bg-foreground text-background",
                }}
                color="default"
                page={page}
                total={Math.ceil(filteredItems.length / rowsPerPage)}
                variant="light"
                onChange={setPage}
            />
            <div>
                <span className="text-sm text-default-500">Rows per page:</span>
                <select
                    className="ml-2 text-sm text-default-600 bg-background border-none"
                    onChange={onRowsPerPageChange}
                    value={rowsPerPage}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );

    const classNames = {
        wrapper: ["max-h-[382px]", "max-w-3xl"],
        th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
        td: [
            "group-data-[first=true]:first:before:rounded-none",
            "group-data-[first=true]:last:before:rounded-none",
            "group-data-[middle=true]:before:rounded-none",
            "group-data-[last=true]:first:before:rounded-none",
            "group-data-[last=true]:last:before:rounded-none",
        ],
    };

    return (
        <div className="p-4">
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <LoadingCustom />
                </div>
            ) : (
                <Table
                    isCompact
                    removeWrapper
                    aria-label="Example table with custom cells, pagination and sorting"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    checkboxesProps={{
                        classNames: {
                            wrapper: "after:bg-foreground after:text-background text-background",
                        },
                    }}
                    classNames={classNames}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                // onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column!.uid} // Use non-null assertion operator (!) or check for existence
                                align={column && column.uid === "actions" ? "center" : "start"} // Check for existence before accessing properties
                                allowsSorting={column && column.sortable} // Check for existence before accessing properties
                            >
                                {column && column.name} {/* Check for existence before rendering */}
                            </TableColumn>
                        )}
                    </TableHeader>

                    <TableBody emptyContent="No data found" items={sortedItems}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof User)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default Page;
