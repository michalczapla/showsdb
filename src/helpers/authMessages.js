export const getMessages = (message) => {
    switch (message) {
        case 'INVALID_PASSWORD':
        case 'EMAIL_NOT_FOUND': return 'User or password invalid';
        case 'USER_DISABLED': return 'User disabled';
        case 'EMAIL_EXISTS': return 'Such user already exists';
        case 'NETWORK_ERROR': return 'Network error - check your connection';
        case 'PASS_CHANGED': return 'Password successfully changed';

        default:
            return 'Fatal error occured';
    }
}
