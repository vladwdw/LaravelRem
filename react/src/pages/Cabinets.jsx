import CabinetTable from "../components/CabinetTable/CabinetTable";
import NavMenu from "../components/NavMenu";
import { useState } from "react";
const Cabinets = () => {
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
            <body class="dark:bg-slate-950">
            <div class="items-center justify-center mx-auto h-screen md:lg:py-0">
    <div class="pt-5 px-[5rem]">
<CabinetTable ></CabinetTable>
        </div> 
        </div>
            </body>

        </html>
     );
}
 
export default Cabinets;