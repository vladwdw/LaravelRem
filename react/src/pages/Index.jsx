import { Navbar } from "flowbite-react";
import NavMenu from "../components/NavMenu";
import { Link } from "react-router-dom";

const Index = () => {
    return ( 
     
<html class="dark">
  <NavMenu></NavMenu>
<body class="container max-w-[1920px] mx-auto dark:bg-slate-800">
          
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      <div class="mx-auto p-10 permissions max-w-[1500px]">
   
        <div class="relative isolate overflow-hidden ligth:bg-gray-100 dark:bg-gray-900 px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stop-color="#7775D6" />
                <stop offset="1" stop-color="E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 class="text-3xl font-bold tracking-tight dark:text-white sm:text-3xl">Автоматизированная информационная система «Рабочее место
              мастера-ремонтника» </h2>
            <p class="mt-6 text-lg leading-8 dark:text-gray-300">Добро пожаловать уважаемый работник. Уже готов к очередной смене?</p>
            <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link to="/login" href="#" class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Перейти</Link>
              <a href="#" class="text-sm font-semibold leading-6 dark:text-white">Разработчик<i class="fa fa-reply" aria-hidden="true"></i> <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div class="flex mt-16 h-90 lg:mt-25">
            <img class="lg: h-90 p-10 mb-2 rounded-md bg-white/5 ring-1 ring-white/10" src="/img/remont.png" alt="App screenshot"/>
          </div>
        </div>
      </div>
  
      <div class="mx-auto max-w-[1500px] p-10 permissions">
        <div class="relative isolate overflow-hidden ligth:bg-gray-100 dark:bg-gray-900 px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
       
  
          <div class="mx-auto mt-5">
            <div class="p-5">
            <h2 class="lg:text-center text-3xl  text-center font-bold tracking-tight dark:text-white sm:text-4xl">Наши преимущества</h2>
            <p class="lg:text-center mt-6  text-center text-lg leading-8 dark:text-gray-200">Ознакомься с нашими преимуществами перед покупками!</p>
          </div>
            <section class="dark:text-white dark:bg-gray-900 body-font">
              <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                  <div class="p-4 md:w-1/3 flex">
                    <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 text-blue-500 mb-4 flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div class="flex-grow pl-6">
                      <h2 class="dark:text-white text-lg title-font font-medium mb-2">Качественный сервис</h2>
                      <p class="leading-relaxed text-base">Чиним быстро, эффективно. А главное - недорого. По карману будет каждому. При первой починке - скидки</p>
                      <a class="mt-3 text-blue-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                 
                  <div class="p-4 md:w-1/3 flex">
                    <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 text-blue-500 mb-4 flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                        <circle cx="6" cy="6" r="3"></circle>
                        <circle cx="6" cy="18" r="3"></circle>
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                      </svg>
                    </div>
                    <div class="flex-grow pl-6">
                      <h2 class="dark:text-white text-lg  font-medium mb-2">Постоянная поддержка</h2>
                      <p class="leading-relaxed text-base">Ответим на любые ваши вопросы по ходу выполнения работы. Будем с вами на связи буквально 24/7</p>
                      <a class="mt-3 text-blue-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div class="p-4 md:w-1/3 flex">
                    <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 text-blue-500 mb-4 flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div class="flex-grow pl-6">
                      <h2 class="dark:text-white text-lg title-font font-medium mb-2">Отзывы</h2>
                      <p class="leading-relaxed text-base">Мы имеем множество положительных отзывах на всех площадках мира и даже на Марсе! Ну пожалуйста, попробуй наш</p>
                      <a class="mt-3 text-blue-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
  
          
  
        </div> 
  
  
       
          </div>
          
          <div>
  
          </div>
          
  
      </div>
      
  
  
  </body>
</html>
     );
}
 
export default Index;