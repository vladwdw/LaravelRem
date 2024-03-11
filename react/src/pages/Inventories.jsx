import InventoryTable from "../components/InventoryTable/InventoryTable";
import NavMenu from "../components/NavMenu";
const Inventories = () => {
    return ( 
        <html class="dark">
        <NavMenu></NavMenu>
        <body class="dark:bg-slate-950">
        <div class="items-center justify-center mx-auto h-screen md:lg:py-0">
<div class="pt-5 px-[5rem]">
<InventoryTable></InventoryTable>
    </div> 
    </div>
        </body>

    </html>
     );

}
 
export default Inventories;