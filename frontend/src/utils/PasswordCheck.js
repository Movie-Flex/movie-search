function checkStrongNess(input_string) {
    const n = input_string.length;
    // Checking lower alphabet in string 
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let specialChar = false;
    const normalChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";

    for (let i = 0; i < n; i++) {
        if (input_string[i] >= "a" && input_string[i] <= "z") {
            hasLower = true;
        }
        if (input_string[i] >= "A" && input_string[i] <= "Z") {
            hasUpper = true;
        }
        if (input_string[i] >= "0" && input_string[i] <= "9") {
            hasDigit = true;
        }
        if (!normalChars.includes(input_string[i])) {
            specialChar = true;
        }
    }

    // Strength of password 
    let strength = "Weak";
    if (hasLower && hasUpper && hasDigit && specialChar && n >= 8) {
        strength = "Strong";
    } else if ((hasLower || hasUpper) && specialChar && n >= 6) {
        strength = "Moderate";
    }

    // console.log(`Strength of password: ${strength}`);
    return strength;
}


export default checkStrongNess;