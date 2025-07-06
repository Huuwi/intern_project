import React, { useState } from 'react'
import { myStore } from '../store'

const ChangeThemeInput = () => {

    const [color, setColor] = useState("pink")
    const changeColor = myStore((state) => state.changeThemeColor)

    return (
        <input
            type="color"
            value={color}
            className=" w-[60px] h-[60px] border-none shadow-md cursor-pointer rounded-lg fixed top-0 right-0"
            onChange={(e) => {
                setColor(e.target.value)
                changeColor(e.target.value)
            }}
        />

    )
}

export default ChangeThemeInput
