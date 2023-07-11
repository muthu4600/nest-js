
const validation = (id: string) => {
    const regex = /^[a-zA-Z0-9-]+$/;
    let status = 200, errorMessage = '';
    if (!regex.test(id)) {
        status = 400,
            errorMessage = 'Oops! Something went wrong'
    }
    return {
        status,
        errorMessage
    }
}
export default validation;