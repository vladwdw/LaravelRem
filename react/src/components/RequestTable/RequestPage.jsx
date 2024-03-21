
import NavMenu from "../NavMenu";

import { useState } from "react";
const RequestPage = () => {

    return ( 
        <html class="dark">
        <NavMenu></NavMenu>
        <body class="container max-w-[1920px] height-[100%] mx-auto dark:bg-slate-950">
        <div class="items-center justify-center mx-auto h-screen md:lg:py-0">
        <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-[10rem] border-solid border-2 border-sky-500">
  <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="text-gray-50 font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-50">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
  </div>
</div>
    </div>
        </body>

    </html>
     );

}
 
export default RequestPage;