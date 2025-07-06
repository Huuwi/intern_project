
const enVars = import.meta.env

const env = enVars.VITE_ENV

const backendUrl = env == "dev" ? enVars.VITE_DEV_BACKEND_URL : enVars.VITE_PRO_BACKEND_URL


export const CONST = {
    enVars, backendUrl

}