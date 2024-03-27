import Footer from "../components/UserTable/Footer";
import AddInventoryModal from "../components/InventoryTable/AddInventoryModal";
import InventoryTable from "../components/InventoryTable/InventoryTable";
import NavMenu from "../components/NavMenu";
import UserInput from "../components/UserTable/UserInput";
import { useState } from "react";
import RequestTable from "../components/RequestTable/RequestTable";
import AddRequestModal from "../components/RequestTable/AddRequestModal";
const Requests = () => {
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
        <html class="dark">
        <NavMenu></NavMenu>
        <body class="container max-w-[1920px] height-[100%] mx-auto dark:bg-slate-950">
        <div class="items-center justify-center mx-auto h-screen md:lg:py-0">
<div class="pt-5 px-[5rem]">
<div className="flex flex-row">
=
    <div class="w-[40rem] ml-[40rem] mb-[1rem] ">
    <UserInput search={handleSearch}></UserInput>
    </div>
    </div>
<RequestTable searchValue={searchValue}></RequestTable>
<AddRequestModal isOpen={isOpen} onClose={openModal}></AddRequestModal>

    </div> 

    </div>
    <Footer></Footer>
        </body>

    </html>
     );

}
 
export default Requests;