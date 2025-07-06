import React from 'react'

const Header = () => {
    let userData = localStorage.getItem("userData") || "{}"
    userData = JSON.parse(userData)
    return (
        <div style={{ backgroundColor: "white" }} >
            <h1>Xin chào : {userData?.nickName}</h1>
        </div>
    )
}

export default Header
