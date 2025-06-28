import React, { useEffect, useState } from 'react'
import DashbardLayout from '../../components/layouts/DashbardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';


const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //get all income details
  const fetchIncomeData = async () => {
    if(loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATH.INCOME.GET_ALL_INCOME}`
      );

      if(response.data){
        setIncomeData(response.data);
      }
      
    } catch (error) {
      console.log("Something went wrong.Please try again",error)
      
    } finally{
      setLoading(false);
    }
  };

  //handle add income
  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;

    //validation
    if(!source.trim()){
      toast.error("Income source is required");
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
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeData();
    }catch(error){
      console.error("Error adding income:",error.response?.data?.message || ErrorEvent.message);
    }
  };

  //delete income
  const deleteIncome = async (id) => {};

  //handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(()=>{
    fetchIncomeData();

    return() => {};
    
  },[]);
    

  return (
    <DashbardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income">

          <AddIncomeForm onAddIncome={handleAddIncome}/>

        </Modal>
      
      </div>
    </DashbardLayout>
  )
}

export default Income
