export const formatDateMMDDYYY = (date) =>{
    return (date.getMonth() + 1) + "-" +  date.getDate() + "-" +  date.getFullYear();
}

export const formatDateDDMMYYY = (date) =>{
    return  date.getDate() + "-" +  (date.getMonth() + 1) +  "-" +  date.getFullYear();
}