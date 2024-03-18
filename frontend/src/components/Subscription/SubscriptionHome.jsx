import { useState } from "react";
import SubscriptionYearButton from "./SubscriptionYearButton";

export default function SubscriptionHome ({yearly, setYearly}){

    return(
        
          <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Payment Page
            </h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Welcome to MovieFlex Payment
            </p>
            <SubscriptionYearButton yearly={yearly} setYearly={setYearly}/>
          </div>
    )
}