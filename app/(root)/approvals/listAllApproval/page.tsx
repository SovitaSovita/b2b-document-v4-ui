'use client'

import React, { useEffect, useMemo, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Chip,
    Button,
    SortDescriptor,
    Selection,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import LoadingCustom from "@/app/components/Material/Loading";
import { listApproved } from "@/app/service/FormManagement";
import { capitalize } from "@/app/service/NextUiUtil";
import { VerticalDotsIcon } from "@/public/icon/TableIcon";
import Link from "next/link";

/* Format date */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).replace(",", "");
};

/* Define columns */
const columns = [
    { uid: "formName", name: "Document Name" },
    { uid: "requestId", name: "Document No" },
    { uid: "formContent", name: "Title" },
    { uid: "requestFrom", name: "Writer" },
    { uid: "requestTo", name: "Request To" },
    { uid: "requestDate", name: "Request Date" },
    { uid: "requestStatus", name: "Status" },
    // { uid: "actions", name: "Actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = ["formName", "requestId", "formContent", "requestFrom", "requestTo", "requestDate", "requestStatus", "actions"];

const ListApproval = ({ userId }: { userId: string }) => {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "requestDate",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchApprovedRequests = async () => {
            try {
                const data = await listApproved('sararuth');
                setRequests(data.rec);
                setError(null);
            } catch (error) {
                setError(error instanceof Error ? error.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchApprovedRequests();

    }, []);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => requests, [requests]);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = new Date(a[sortDescriptor.column as keyof typeof a]).getTime();
            const second = new Date(b[sortDescriptor.column as keyof typeof b]).getTime();
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = (request: any, columnKey: React.Key) => {
        const cellValue = request[columnKey as keyof typeof request];
        switch (columnKey) {
            case "requestDate":
                return formatDate(cellValue);
            case "requestStatus":
                return (
                    <Chip size="sm" variant="flat">
                        {capitalize(cellValue)}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    if (loading) return <LoadingCustom />;
    if (error) return <p>Error: {error}</p>;

    const topContent = (
        <div className="flex justify-between items-center">
            {/* Add any top content here */}
        </div>
    );

    const bottomContent = (
        <div className="py-2 px-2 flex justify-between items-center">
            <span className="w-[30%] text-small text-default-400">
                {/* Left Content */}
            </span>
            <span></span>
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(newPage) => setPage(newPage)}
                />
            </div>
        </div>
    );

    return (
        <div className="p-4">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link href={"/approvals/holding"} className="btn btn-ghost tex-sm">Holding</Link>
                    <Link href={"/approvals/completed"} className="btn btn-ghost tex-sm">Completed</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <a className="btn btn-ghost tex-sm">Approval</a>
                    </ul>
                </div>
            </div>
            <Table
                aria-label="Approved Requests Table"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                selectionMode="multiple" // Check box
                color="secondary"
                classNames={{
                    wrapper: "max-h-[382px]",
                }}
                selectedKeys={selectedKeys}
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                        // allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No requests found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default ListApproval;
