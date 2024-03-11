import React from 'react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../../components/UserTable/styles/pagination.css'
const UserPagination = ({ currentPage, lastPage, onChangePage }) => {
 // Определение функции обратного вызова для реагирования на клик по странице
 const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // react-paginate использует индексацию с 0
    onChangePage(selectedPage);
 };

 // react-paginate ожидает объект с настройками, включая текущую страницу, общее количество страниц и количество страниц на странице
 const paginationConfig = {
   
    pageCount: lastPage,
    marginPagesDisplayed: 1,
    pageRangeDisplayed: 2,
    onPageChange: handlePageClick,
    containerClassName: "pagination",
    activeClassName: "active",
    pageClassName: "page-item",
    pageLinkClassName: "page-link",
    previousClassName: "page-item",
    nextClassName: "page-item",
    previousLinkClassName: "page-link",
    nextLinkClassName: "page-link",
    breakClassName: "page-item",
    breakLinkClassName: "page-link",
    disabledClassName: "disabled",
    initialPage: currentPage - 1, // react-paginate использует индексацию с 0
 };
 useEffect(() => {
   // Замена текста кнопки "Previous" на "Предыдущий"
   const prevLink = document.querySelector('.prev.page-link');
   if (prevLink) {
     prevLink.textContent = 'Предыдущий';
   }

   // Замена текста кнопки "Next" на "Следующий"
   var links = document.getElementsByClassName("page-link");

   // Проходим по всем элементам и заменяем текст
   for (var i = 0; i < links.length; i++) {
    // Проверяем, содержит ли текст элемента слово "Next"
    if (links[i].textContent.includes("Next")) {
       // Заменяем текст на "Следующий"
       links[i].textContent = "Следующий";
    }
    if (links[i].textContent.includes("Previous")) {
      // Заменяем текст на "Следующий"
      links[i].textContent = "Предыдущий";
   }
   }
}, []);

 return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 mt-5 dark:text-amber-50" aria-label="Table navigation">

      <ReactPaginate {...paginationConfig} />
    </nav>
 );
};

export default UserPagination;