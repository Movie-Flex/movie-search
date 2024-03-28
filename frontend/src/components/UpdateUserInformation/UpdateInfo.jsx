import { useState } from "react";
import { useUpdateProfile } from "../../hooks/useUpdateprofile";
import toast from "react-hot-toast";
import { country } from "../../utils/countrycode";

export default function UpdateInfo() {
  const { updateProfile } = useUpdateProfile();

  const [updatedData, setUpdatedData] = useState({
    address: "",
    phone_number_country: "+91",
    phone_number_digits: "",
    gender: "",
    dob: "",
  });

  const handleSubmit = async (e, updatedData) => {
    e.preventDefault();

    if (
      !updatedData.address ||
      !updatedData.phone_number_digits ||
      !updatedData.dob ||
      !updatedData.gender
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (updatedData.phone_number_digits.length !== 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const updationData = {
      address: updatedData.address,
      phone: updatedData.phone_number_country + updatedData.phone_number_digits,
      dob: updatedData.dob,
      gender: updatedData.gender,
    };

    try {
      await updateProfile(updationData);
      setUpdatedData({})
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div class="container max-w-screen-lg mx-auto">
        <div>
          <h2 class="font-semibold text-xl text-gray-600 mb-6">
            Update your Profile{" "}
          </h2>
          <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div class="text-gray-600">
                <p class="font-medium text-lg">User Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div class="lg:col-span-2">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div class="md:col-span-5">
                    <label for="address">Address</label>
                    <input
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          address: e.target.value,
                        })
                      }
                      type="text"
                      name="address"
                      id="address"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={updatedData.address}
                    />
                  </div>

                  <div class="md:col-span-5">
                    <label for="phone_number">Phone Number</label>
                    <div>
                      <div className="flex">
                        <select class="h-10 border mt-1 mr-1 rounded px-4 w-3/10 bg-gray-50">
                          {country.map((country, index) => (
                            <option key={index}>
                              {country.dial_code} ({country.code})
                            </option>
                          ))}
                        </select>
                        <input
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              phone_number_digits: e.target.value,
                            })
                          }
                          type="number"
                          name="phone_number"
                          id="phone_number"
                          class="h-10 border mt-1 rounded px-4 w-7/10 bg-gray-50"
                          value={updatedData.phone_number_digits}
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="md:col-span-2">
                    <label for="gender">Gender</label>
                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <select
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            gender: e.target.value,
                          })
                        }
                        class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={updatedData.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <button
                        onClick={(e) =>
                          setUpdatedData({ ...updatedData, gender: "" })
                        }
                        tabindex="-1"
                        class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                      >
                        <svg
                          class="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="md:col-span-2">
                    <label for="dob">Date of Birth</label>
                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            dob: e.target.value,
                          })
                        }
                        type="date"
                        name="dob"
                        id="dob"
                        placeholder="dob"
                        class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={updatedData.dob}
                      />
                      <button
                        onClick={(e) =>
                          setUpdatedData({ ...updatedData, dob: "" })
                        }
                        tabindex="-1"
                        class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                      >
                        <svg
                          class="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="md:col-span-5">
                    <label for="billing_same" class="ml-2">
                      Please click on the submit button to update your profile.
                    </label>
                  </div>

                  <div class="md:col-span-5 text-right">
                    <div class="inline-flex items-end">
                      <button
                        onClick={(e) => handleSubmit(e, updatedData)}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
