import { create } from 'zustand';

const themeColor = localStorage.getItem("themeColor") || `linear-gradient(135deg, #884e4e 0%, #ffffff 100%)`

const UIslide = (set, get, store) => ({
    themeColor,
    changeThemeColor: (color) => {
        set(state => {
            localStorage.setItem("themeColor", `linear-gradient(135deg, ${color} 0%, #ffffff 100%)`)
            return {
                ...state,
                themeColor: `linear-gradient(135deg, ${color} 0%, #ffffff 100%)`
            }
        })
    }

})


export const myStore = create((set, get, store) => ({
    ...UIslide(set, get, store),
}))

// {
//     id, name, price
// }