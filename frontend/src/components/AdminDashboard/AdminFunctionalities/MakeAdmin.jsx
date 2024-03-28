import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useAdminMovieFunctions } from "../../../hooks/useAdminMovieFunctions";
import toast from "react-hot-toast";

export default function MakeAdmin() {
  const { user } = useContext(UserContext);
  const { adminGenerateToken } = useAdminMovieFunctions();

  const [generateAdminData, setGenerateAdminData] = useState({
    clientEmail: "",
    adminEmail: user.email,
    role: "admin",
  });

  const [generatedToken, setGeneratedToken] = useState("");

  const makeAdmin = async (generateAdminData) => {
    try {
      const response = await adminGenerateToken(generateAdminData);
      setGeneratedToken(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <h1 class="text-3xl font-bold mb-8">Make Admin</h1>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Client Email
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border
                     border-red rounded py-3 px-4 mb-3"
            id="grid-first-name"
            type="text"
            placeholder="Client Email"
            value={generateAdminData.clientEmail}
            onChange={(e) =>
              setGenerateAdminData({
                ...generateAdminData,
                clientEmail: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => makeAdmin(generateAdminData)}
        >
          Make Admin
        </button>
      </div>

      {/* show the genrated token from the backend */}
      {/* also make the copy ion so that user can copy */}
      <div class="mt-4">
        <h1 class="text-xl font-bold">Generated Token</h1>
        <p class="text-lg font-bold">{generatedToken}</p>

        <button
          onClick={() => {
            navigator.clipboard.writeText(generatedToken);
            toast.success("Token Copied");
          }}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Copy Token
        </button>
      </div>
    </div>
  );
}
