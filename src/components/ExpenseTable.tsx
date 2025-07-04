import React, { useState } from "react";
import { DatePicker, Input, Table, Tag, Button, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

export interface Expense {
  key: string;
  expenseCategory: string;
  dateOfExpense: Date;
  expenseDescription: string;
  departmentNames: string[];
  expenseAmount: number;
}

interface TableComponents {
  data: Expense[];
  onChange: (key: string, field: keyof Expense, value: any) => void;
  savedKeys: string[];
}



export const EditableTable: React.FC<{
  data: Expense[];
  onChange: (key: string, field: keyof Expense, value: any) => void;
  savedKeys: string[];
}> = ({ data, onChange, savedKeys }) => {
  const columns: ColumnsType<Expense> = [
    {
      title: "Category",
      dataIndex: "expenseCategory",
      key: "expenseCategory",
      render: (_, record) => (
        <Input
          value={record.expenseCategory}
          disabled={savedKeys.includes(record.key)}
          onChange={(e) =>
            onChange(record.key, "expenseCategory", e.target.value)
          }
        />
      ),
    },
    {
      title: "Date",
      dataIndex: "dateOfExpense",
      key: "dateOfExpense",
      render: (_, record) => (
        <DatePicker
          value={moment(record.dateOfExpense)}
          disabled={savedKeys.includes(record.key)}
          onChange={(date) =>
            onChange(
              record.key,
              "dateOfExpense",
              date ? date.toDate() : null
            )
          }
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "expenseDescription",
      key: "expenseDescription",
      render: (_, record) => (
        <Input
          value={record.expenseDescription}
          disabled={savedKeys.includes(record.key)}
          onChange={(e) =>
            onChange(record.key, "expenseDescription", e.target.value)
          }
        />
      ),
    },
    {
      title: "Department Name",
      dataIndex: "departmentNames",
      key: "departmentNames",
      render: (_, record) => (
        <Select
          mode="tags"
          style={{ width: "100%" }}
          value={record.departmentNames}
          disabled={savedKeys.includes(record.key)}
          onChange={(value) =>
            onChange(record.key, "departmentNames", value)
          }
          tokenSeparators={[","]}
        />
      ),
    },
    {
      title: "Amount",
      dataIndex: "expenseAmount",
      key: "expenseAmount",
      render: (_, record) => (
        <Input
          type="number"
          value={typeof record.expenseAmount === "number"
            ? record.expenseAmount.toString()
            : ""
          }
          disabled={savedKeys.includes(record.key)}
          onChange={(e) =>
            onChange(
              record.key,
              "expenseAmount",
              parseFloat(e.target.value) || 0
            )
          }
        />
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
};



