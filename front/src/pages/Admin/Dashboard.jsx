import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../../Auths/api';

function Dashboard() {
  const [usersCountWithRole2, setUsersCountWithRole2] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [expiredMembersCount, setExpiredMembersCount] = useState(0);
  const [expiringMembersCount, setExpiringMembersCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCountResponse = await fetchWithAuth("get", "users/count");
        setUsersCountWithRole2(usersCountResponse.data.count);

        const pendingAmountResponse = await fetchWithAuth("get", "pendingAmount");
        setPendingAmount(pendingAmountResponse.data.totalPendingAmount);

        const totalEarningsResponse = await fetchWithAuth("get", "totalEarnings");
        setTotalEarnings(totalEarningsResponse.data.totalEarnedAmount);

        const expiredMembersResponse = await fetchWithAuth("get", "expiredMembersCount");
        setExpiredMembersCount(expiredMembersResponse.data.expiredMembersCount);

        const expiringMembersResponse = await fetchWithAuth("get", "expiringMembersCount");
        setExpiringMembersCount(expiringMembersResponse.data.expiringMembersCount);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 mx-4">
      <Link to="/admin/users" className=" border-2 shadow-sm  p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="">
          <h2 className="text-[.9rem] xl:text-[1rem] font-semibold ">All Members</h2>
          <p className="text-[3rem] font-semibold">{usersCountWithRole2}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500" width="4rem" height="4rem" viewBox="0 0 640 512"><path fill="currentColor" d="M48 48h88c13.3 0 24-10.7 24-24S149.3 0 136 0H32C14.3 0 0 14.3 0 32v104c0 13.3 10.7 24 24 24s24-10.7 24-24zm127.8 176a48 48 0 1 0 0-96a48 48 0 1 0 0 96m-26.5 32c-29.4 0-53.3 23.9-53.3 53.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4zm368 80c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3h-69.4c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6zm-89.4 0c-8.6-24.3-29.9-42.6-55.9-47c-3.9-.7-7.9-1-12-1h-80c-4.1 0-8.1.3-12 1c-26 4.4-47.3 22.7-55.9 47c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24h176c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24M464 224a48 48 0 1 0 0-96a48 48 0 1 0 0 96m-80-32a64 64 0 1 0-128 0a64 64 0 1 0 128 0M504 48h88v88c0 13.3 10.7 24 24 24s24-10.7 24-24V32c0-17.7-14.3-32-32-32H504c-13.3 0-24 10.7-24 24s10.7 24 24 24M48 464v-88c0-13.3-10.7-24-24-24S0 362.7 0 376v104c0 17.7 14.3 32 32 32h104c13.3 0 24-10.7 24-24s-10.7-24-24-24zm456 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h104c17.7 0 32-14.3 32-32V376c0-13.3-10.7-24-24-24s-24 10.7-24 24v88z"/></svg>
        </div>
      </Link>

      <Link to="/admin/pendingAmount" className=" border-2 shadow-sm  p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="">
          <h2 className="text-[.9rem] xl:text-[1rem] font-semibold ">Pending Amount</h2>
          <p className="text-[2.5rem] font-semibold mt-2">NRs: {pendingAmount}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500" width="4rem" height="4rem" viewBox="0 0 2048 2048"><path fill="currentColor" d="M2048 384v1280H128v-256H0V256h1792v128zm-512 0q0 27 10 50t27 40t41 28t50 10V384zM128 512q27 0 50-10t40-27t28-41t10-50H128zm0 512q53 0 99 20t82 55t55 81t20 100h1024q0-53 20-99t55-82t81-55t100-20V640q-53 0-99-20t-82-55t-55-81t-20-100H384q0 53-20 99t-55 82t-81 55t-100 20zm1536 128q-27 0-50 10t-40 27t-28 41t-10 50h128zM128 1280h128q0-27-10-50t-27-40t-41-28t-50-10zm1792-768h-128v896H256v128h1664zM448 896q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19m896 0q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19m-448 256q-53 0-99-20t-82-55t-55-81t-20-100V768q0-53 20-99t55-82t81-55t100-20q53 0 99 20t82 55t55 81t20 100v128q0 53-20 99t-55 82t-81 55t-100 20M768 896q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50V768q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50z"/></svg>
        </div>
      </Link>

      <Link to="/admin/paidAmount" className=" border-2 shadow-sm  p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="">
          <h2 className="text-[.9rem] xl:text-[1rem] font-semibold ">Total Earnings</h2>
          <p className="text-[2.5rem] font-semibold mt-2">NRs:{totalEarnings}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg"  className="text-blue-500" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M10.5 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6M9 10a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0M2 6.25A2.25 2.25 0 0 1 4.25 4h12.5A2.25 2.25 0 0 1 19 6.25V11h-1.5V8.5h-.75a2.25 2.25 0 0 1-2.25-2.25V5.5h-8v.75A2.25 2.25 0 0 1 4.25 8.5H3.5v3h.75a2.25 2.25 0 0 1 2.25 2.25v.75H14V16H4.25A2.25 2.25 0 0 1 2 13.75zm2.25-.75a.75.75 0 0 0-.75.75V7h.75A.75.75 0 0 0 5 6.25V5.5zM17.5 7v-.75a.75.75 0 0 0-.75-.75H16v.75c0 .414.336.75.75.75zm-14 6.75c0 .414.336.75.75.75H5v-.75a.75.75 0 0 0-.75-.75H3.5zm.901 3.75H14V19H7a3 3 0 0 1-2.599-1.5M22 11V9a3 3 0 0 0-1.5-2.599V11zm-5.5 1a1.5 1.5 0 0 0-1.5 1.5v8a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5zm.5 4.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1m3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1m-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1m3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1m-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1m3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1M16.5 14a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5z"/></svg>          </div>
          </Link>
   

      <Link to="/admin/expiredMembers" className=" border-2 shadow-sm  p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="">
          <h2 className="text-[.9rem] xl:text-[1rem] font-semibold ">Expired Members</h2>
          <p className="text-[3rem] font-semibold">{expiredMembersCount}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="text-orange-500 w-[3rem] xl:w-[4rem]  h-[3rem] xl:h-[4rem]" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18V6H3zM1 5a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm8 5a1 1 0 1 0-2 0a1 1 0 0 0 2 0m2 0a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-2.998 6c-.967 0-1.84.39-2.475 1.025l-1.414-1.414A5.486 5.486 0 0 1 8.002 14a5.49 5.49 0 0 1 3.889 1.61l-1.414 1.415A3.486 3.486 0 0 0 8.002 16m9.79-7.207L16 10.586l-1.793-1.793l-1.414 1.414L14.586 12l-1.793 1.793l1.414 1.414L16 13.414l1.793 1.793l1.414-1.414L17.414 12l1.793-1.793z"/></svg> 
          </div>
          </Link>
      <Link to="/admin/expiringMembers" className=" border-2 shadow-sm  p-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="">
          <h2 className="text-[.9rem] xl:text-[1rem] font-semibold ">Expiring Members (4 days left)</h2>
          <p className="text-[3rem] font-semibold">{expiringMembersCount}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-500" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M13.34 8.17c-.93 0-1.69-.77-1.69-1.7a1.69 1.69 0 0 1 1.69-1.69c.94 0 1.7.76 1.7 1.69c0 .93-.76 1.7-1.7 1.7M10.3 19.93l-5.93-1.18l.34-1.7l4.15.85l1.35-6.86l-1.52.6v2.86H7v-3.96l4.4-1.87l.67-.08c.6 0 1.1.34 1.43.85l.86 1.35c.68 1.21 2.03 2.03 3.64 2.03v1.68c-1.86 0-3.56-.83-4.66-2.1l-.5 2.54l1.77 1.69V23h-1.69v-5.1l-1.78-1.69zM21 23h-2V3H6v13.11l-2-.42V1h17zM6 23H4v-3.22l2 .42z"/></svg>  
        </div>
  </Link>
  </div>
  );
}

export default Dashboard;
