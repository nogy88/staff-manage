import { Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";
import { RenderCell } from "./render-cell";
import { TableProps } from "@/global/interfaces";

export const CustomTable = (props: TableProps) => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={props.columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={props.users || []}>
          {(item) => (
            <TableRow>
              {(columnKey) => <TableCell>{RenderCell({ user: item, columnKey: columnKey })}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
