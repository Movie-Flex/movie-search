import axios from "axios";

export const useAvailableUser = () => {
    const availableUser = async (username) => {
        try {
            console.log("Username", username);
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

    return { availableUser };
}