//Dashboard page
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Flex, Segmented } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditableTable } from "../components/ExpenseTable";
import type { Expense } from "../components/ExpenseTable";
import { ExpenseFormModal } from "../components/ExpenseFormModal";
import type { FlexProps } from 'antd';
import React from 'react';
//import name from "./Register";


function getGreeting(name: string){
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) greeting = "Good Morning";
    else if (hour <18) greeting = "Good Afternoon";
    else greeting = "Good Evening";
    return `${greeting}, ${name}`;

}


const initialData: Expense[] = [
  {
    key: "1",
    expenseCategory: "Wage",
    dateOfExpense: new Date(),
    expenseDescription: "Employees need to be compensated",
    departmentNames: ["Marketing Department"],
    expenseAmount: 22.38,
  },
];

const Dashboard: React.FC = () => {
    const token = localStorage.getItem("token");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName") || "Guest";

    // dynamic table connection
    const [expenses, setExpenses] = useState<Expense[]>(initialData);
    const [savedExpenses, setSavedExpenses] = useState<Expense[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleFieldChange = (
      key: string,
      field: keyof Expense,
      value: any,
    ) => {
      setExpenses((prev) =>
        prev.map((item) => (item.key === key ? { ...item, [field]: value } : item))
      );
    };

    const handleSave = (record: Expense) => {
      if (!savedExpenses.find((row) => row.key === record.key)) {
        setSavedExpenses((prev) => [...prev, record]);
      }
    };

    const handleAddExpense = (values: any) => {
      const newExpense: Expense = {
        key: Date.now().toString(),
        expenseCategory: values.expenseCategory,
        dateOfExpense: values.dateOfExpense.toDate(),
        expenseDescription: values.expenseDescription,
        departmentNames: values.departmentNames
          ? values.departmentNames.split(",").map((d: string) => d.trim())
          : [],
          expenseAmount: typeof values.expenseAmount === "number"
          ? values.expenseAmount
          : parseFloat(values.expenseAmount),
      };

      console.log("Adding new expense:", newExpense);
  
      setExpenses((prev) => [...prev, newExpense]);
      // setSavedExpenses((prev) => [...prev, newExpense]);
      setIsModalVisible(false);
    };

    return(
      <div className="p-8">
      <div className="mb-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Expenses</h2>
      <Flex gap="middle" align="start">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Expense
        </Button>
      </Flex>
        <h6> </h6>
      </div>

      <EditableTable
        data={expenses}
        onChange={handleFieldChange}
        savedKeys={savedExpenses.map((e) => e.key)}
      />

      <ExpenseFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleAddExpense}
      />

    </div>
  );
}

export default Dashboard;