export default {
    apiBase: "http://1be146f4.ngrok.io/",
    getBudgets: {
        endpoint: "budgets",
    },
    createBudget: {
        endpoint: "budgets/create",
        method: "post",
    },
    deleteBudget: {
        endpoint: ({data}) => `budgets?name=${data.name}`,
        method: "delete",
    },
    getUsers: {
        endpoint: "config/users",
    },
    getAccounts: {
        endpoint: "aws/organizations",  
    },
    getUserSpendings: {
        endpoint: "aws/spending/account",
        method: "post",
    },
    createUser: {
        endpoint: ({data}) => `config/user?name=${data.name}`,
        method: "post",
    },
    addCommunicationToUser: {
        endpoint: ({data}) => `config/addCommunicationToUser?userName=${data.userName}&communicationName=${data.communicationName}&communicationValue=${data.communicationValue}`,
        method: "post",
    },
    deleteUserCommunication: {
        endpoint: ({data}) => `config/deleteUserCommunication?userName=${data.userName}&communicationName=${data.communicationName}&communicationValue=${data.communicationValue}`,
        method: "delete",
    },
    postBudgetIncreaseLimit: {
        endpoint: "alerts/requestLimitIncrease",
        method: "post",
    },
};
