'use client'
import { listApproved } from "@/app/service/FormManagement";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    SortDescriptor
} from "@nextui-org/react";
import LoadingCustom from "@/app/components/Material/Loading";
import { capitalize } from "../../../../app/service/NextUiUtil";

const INITIAL_VISIBLE_COLUMNS = ["requestId", "formId", "requestFrom", "requestTo", "reqOrder", "requestDate", "requestStatus", "formContent"];

const Page = () => {
    const [approvedList, setApprovedList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "requestDate",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const userId = 'sovita';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await listApproved(userId);
                setApprovedList(data.rec); // Assuming data has a `rec` property
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const filteredItems = approvedList.filter((request) =>
        request.requestFrom.toLowerCase().includes(filterValue.toLowerCase()) ||
        request.requestTo.toLowerCase().includes(filterValue.toLowerCase())
    );

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const sortedItems = [...items].sort((a, b) => {
        const first = new Date(a[sortDescriptor.column]).getTime();
        const second = new Date(b[sortDescriptor.column]).getTime();
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];
        return cellValue;
    };

    const topContent = (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterValue}
                    onChange={handleFilterChange}
                    className="input-custom" 
                />
            </div>
        </div>
    );

    const bottomContent = (
        <div className="py-2 px-2 flex justify-between items-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
            />
        </div>
    );

    if (loading) return <LoadingCustom />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={visibleColumns.map((columnKey) => ({
                    uid: columnKey,
                    name: capitalize(columnKey) 
                }))}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align="start"
                            allowsSorting={true}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent="No requests found" items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Page;
