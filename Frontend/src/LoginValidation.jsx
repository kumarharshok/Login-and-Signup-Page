function Validation(values) {
    let error = {};
    const email_pattern = /^[^ \s@]+@[^ \s@]+\.[^ \s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (values.name === "") {
        error.name = "Name is required";
    }

    if (values.email === "") {
        error.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Enter a valid Email Address";
    }

    if (values.password === "") {
        error.password = "Password is Required";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must contain at least 1 uppercase letter, lowercase letter, and number with a minimum length of 8 characters";
    }

    return error;
}

export default Validation;
