export const limitWords = (expression, limit) => {
    if (expression && limit) {
        // console.log(expression);
        // console.log(expression.split(', ').slice(0,limit).join(', '));
        return expression.split(', ').slice(0,limit).join(', ');
    }
}