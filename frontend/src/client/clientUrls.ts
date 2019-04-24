export default {
    apiBase: "http://localhost:8100/",
    getBudgets: {
        endpoint: "budgets",
    },
    createBudget: {
        endpoint: "budgets/create",
        method: "post",
    },
    postBudgetIncreaseLimit: {
        endpoint: "alerts/requestLimitIncrease",
        method: "post",
    },
};
