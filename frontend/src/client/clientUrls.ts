export default {
    apiBase: "http://localhost:8100/",
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
};
