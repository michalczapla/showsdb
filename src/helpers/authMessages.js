export const getMessages = (message) => {
    switch (message) {
        case 'INVALID_PASSWORD':
        case 'EMAIL_NOT_FOUND': return 'User or password invalid';
        case 'USER_DISABLED': return 'User disabled';
        default:
            return 'Fatal error occured';
    }
}
