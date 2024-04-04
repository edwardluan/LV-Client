const validForm = ({ phoneNumber, username, password, confirmPassword }) => {
    const err = {}
    if (!username) {
        err.username = "Hãy nhập tên đăng nhập !"
    } else if (username.replace(" ").length > 20) {
        err.username = "Tên đăng nhập không được vượt quá 20 kí tự !"
    }

    if (!phoneNumber) {
        err.phoneNumber = "Hãy nhập số điện thoại !"
    } else if (phoneNumber.replace(" ").length !== 10) { 
        err.phoneNumber = "Sai định dạng số điện thoại !"
    }


    if (!password) {
        err.password = "Hãy nhập mật khẩu !"
    } else if (password.replace(" ").length < 6) { 
        err.password = "Mật khẩu phải nhiều hơn 6 ký tự !"
    }

    if (password !== confirmPassword) {
        err.confirmPassword = "Nhập lại mật khẩu chưa đúng !"
    }

    return { errMsg: err, errLenght: Object.keys(err).length }
} 
export default validForm