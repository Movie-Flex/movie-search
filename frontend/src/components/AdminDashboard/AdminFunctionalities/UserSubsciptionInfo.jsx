import { useEffect, useState } from "react";
import { useAdminMovieFunctions } from "../../../hooks/useAdminMovieFunctions";
import toast from "react-hot-toast";

export default function UserSubscriptionInfo() {
  const { getSubscriptionData } = useAdminMovieFunctions();
  const [totalPages, setTotalPages] = useState(4);
  const [loading, setLoading] = useState(true);
  const [userSubscriptionInfo, setUserSubscriptionInfo] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const fetchSubscriptionData = async (page) => {
    try {
      const response = await getSubscriptionData(page);
      setUserSubscriptionInfo(response);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentPageIncrease = () => {
   if(currentPage < totalPages){
    setCurrentPage(currentPage + 1);
    fetchSubscriptionData(currentPage + 1);
   }
   else{
        toast.error("No more data Found");
   }
  };

  const handleCurrentPageDecrease = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
      fetchSubscriptionData(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  },[]);

  return (
    <>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <h1 class="text-3xl font-bold mb-8">User Subscription Info</h1>
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align
                -middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              {loading ? (
                <div class="text-center">
                  <div class="inline-block animate-spin ease duration-300 w-5 h-5 bg-blue-500"></div>
                </div>
              ) : (
                <div class="shadow overflow-hidden   border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y  divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Subscription
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {userSubscriptionInfo.data.map((user) => (
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-10 w-10">
                                <img
                                  class="h-10 w-10 rounded-full"
                                  src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account
                                                         -profile-user-mobile.png"
                                  alt=""
                                />
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {user.subscription}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Date(user.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-3 justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCurrentPageDecrease()}
        >
          Previous
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCurrentPageIncrease()}
        >
          Next
        </button>
      </div>
    </>
  );
}
