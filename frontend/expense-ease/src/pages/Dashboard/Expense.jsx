import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashbardLayout from '../../components/layouts/DashbardLayout'
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath';
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert';
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react';
import ExpenseOverview from '../../components/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';

const Expense = () => {

  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
  });
  
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //get all expense details
  const fetchExpenseData = async () => {
    if(loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATH.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data){
        setExpenseData(response.data);
      }
      
    } catch (error) {
      console.log("Something went wrong.Please try again",error)
      
    } finally{
      setLoading(false);
    }
  };

  //handle add expense
  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense;

    //validation
    if(!category.trim()){
      toast.error("Expense category is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be valid number greater than 0");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseData();
    }catch(error){
      console.error("Error adding expense:",error.response?.data?.message || error.message);
    }
  };

  //delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Expense deleted successfully");
      fetchExpenseData();
      
    } catch (error) {
      console.error("Error deleting expense:",error.response?.data?.message || error.message);
      
    };
  };

  //handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {

      const response = await axiosInstance.get(
        API_PATH.EXPENSE.DOWNLOAD_EXPENSE,{
          responseType: "blob",
        }
      );

      //create url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      
    } catch (error) {
      console.error("Error downloading expense details:",error.response?.data?.message || error.message);
      toast.error("Failed to download expense details.Please try again");
      
    }
  };

  useEffect(()=>{
      fetchExpenseData();
  
      return() => {};
      
    },[]);

  return (
    <DashbardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={()=>setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
          transactions={expenseData}
          onDelete={(id)=>{
            setOpenDeleteAlert({show: true, data: id});
          }}
          onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense">

            <AddExpenseForm onAddExpense={handleAddExpense}/>

        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show: false, data: null})}
        title="Delete Income"
        >
          <DeleteAlert
          content="Are you sure you want to delete this income"
          onDelete={()=>deleteExpense(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashbardLayout>
  )
}

export default Expense
