export const getVariables = () => {

    //obtenemos los variables de entorno
    import.meta.env

    return {
        ...import.meta.env
    }
}