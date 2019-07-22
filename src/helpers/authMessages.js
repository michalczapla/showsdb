export const getMessages = (message) => {
    switch (message) {
        case 'INVALID_PASSWORD':
        case 'EMAIL_NOT_FOUND': return 'User or password invalid';
        case 'USER_DISABLED': return 'User disabled';
        case 'EMAIL_EXISTS': return 'Such user already exists';
        default:
            return 'Fatal error occured';
    }
}
