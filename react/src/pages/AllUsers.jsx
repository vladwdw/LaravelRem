import NavMenu from "../components/NavMenu";
import ActionsDropdown from "../components/UserTable/ActionsDropdown";
import AddUserModal from "../components/UserTable/AddUserModal";
import Footer from "../components/UserTable/Footer";
import UserInput from "../components/UserTable/UserInput";
import UserModal from "../components/UserTable/UserModal";
import UserTable from "../components/UserTable/UserTable";
import { useState } from "react";
import '../App.css'
const AllUsers = () => {
const [isOpen,setOpen]=useState(false)
const [searchValue, setSearchValue] = useState('');
const handleSearch = (event) => {
    setSearchValue(event.target.value);
 };
 console.log(searchValue);
const openModal=()=>{
    setOpen(!isOpen);
}
    return (

<html class="dark dark:bg-slate-950">
<NavMenu></NavMenu>

<body class=" container max-w-[1920px] height-[100%] mx-auto dark:bg-slate-950">

<div class="items-center  mx-auto  md:lg:py-0">
    <div class="pt-5 px-[5rem]">
    <div className="flex flex-row">
    <div>
    <button type="button" onClick={openModal} class=" text-gray-900 mb-5  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex text-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 me-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>   
        Добавить пользователя
         
    </button>
    </div>
    <div class="w-[40rem] ml-[28rem]">
    <UserInput search={handleSearch}></UserInput>
    </div>
    </div>
    
 
    <AddUserModal isOpen={isOpen} onClose={openModal}></AddUserModal>

 


   
  

<UserTable searchValue={searchValue}></UserTable>

</div>
<Footer></Footer>
</div>

</body>

</html>
     );
}
 
export default AllUsers;