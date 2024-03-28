import axios from "axios";

export const useAvailableUser = () => {
    const availableUserName = async (username) => {
        try {
            const response = await axios.post("http://localhost:3002/api/availableUser",{
                username: username
            });
            if (response.status === 200) {
                return true;
            }
            else if(response.status === 209){
                return false;

            }

        } catch (error) {
            console.log("Error", error);
        }
    };

    const availableUserEmail = async (email) => {
        try {
            const response = await axios.post("http://localhost:3002/api/availableUser",{
                email: email
            });
            if (response.status === 200) {
               
                return true;
            }
            else if(response.status === 209){
               
                return false;

            }

        } catch (error) {
            console.log("Error", error);
        }
    };

    return { availableUserName,availableUserEmail};
}