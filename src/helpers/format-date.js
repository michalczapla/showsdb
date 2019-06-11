export const formatDateMMDDYYY = (date) =>{
    date = new Date(date);
    return (date.getMonth() + 1) + "-" +  date.getDate() + "-" +  date.getFullYear();
}

export const formatDateDDMMYYY = (date) =>{
    date = new Date(date);
    return  date.getDate() + "-" +  (date.getMonth() + 1) +  "-" +  date.getFullYear();
}