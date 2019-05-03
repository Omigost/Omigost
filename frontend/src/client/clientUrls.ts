export default {
    apiBase: "http://d7d4f9bd.ngrok.io/",
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
    deleteUser: {
        endpoint: ({data}) => `config/user?name=${data.name}`,
        method: "delete",
    },
    addCommunicationToUser: {
        endpoint: ({data}) => `config/addCommunicationToUser?userName=${data.userName}&communicationName=${data.communicationName}&communicationValue=${data.communicationValue}`,
        method: "post",
    },
    addAccountToUser: {
        endpoint: ({data}) => `config/addAccountToUser?userName=${data.userName}&accountName=${data.accountName}`,
        method: "post",
    },
    deleteUserCommunication: {
        endpoint: ({data}) => `config/deleteUserCommunication?userName=${data.userName}&communicationName=${data.communicationName}&communicationValue=${data.communicationValue}`,
        method: "delete",
    },
    deleteAccountFromUser: {
        endpoint: ({data}) => `config/deleteUserAccount?userName=${data.userName}&accountName=${data.accountName}`,
        method: "delete",
    },
    postBudgetIncreaseLimit: {
        endpoint: "alerts/requestLimitIncrease",
        method: "post",
    },
    getRecentEC2CostAllocationTags: {
        endpoint: ({data}) => `tag/cost/ec2?start=${data.startDate}&end=${data.endDate}`, 
    },
};
