import faker from "faker";

export default function fakeBudget() {
    return {
        "budgetName": faker.finance.accountName(),
        "budgetLimit": {
            "amount": faker.finance.amount(),
            "unit": "USD",
        },
        "costFilters": {
            "Service": [
                faker.company.companyName(),
                faker.company.companySuffix(),
            ],
        },
        "costTypes": {
            "includeTax": faker.random.boolean(),
            "includeSubscription": faker.random.boolean(),
            "useBlended": faker.random.boolean(),
            "includeRefund": faker.random.boolean(),
            "includeCredit": faker.random.boolean(),
            "includeUpfront": faker.random.boolean(),
            "includeRecurring": faker.random.boolean(),
            "includeOtherSubscription": faker.random.boolean(),
            "includeSupport": faker.random.boolean(),
            "includeDiscount": faker.random.boolean(),
            "useAmortized": faker.random.boolean(),
        },
        "timeUnit": "MONTHLY",
        "timePeriod": {
            "start": faker.date.past(),
            "end": faker.date.past(),
        },
        "calculatedSpend": {
            "actualSpend": {
                "amount": faker.finance.amount(),
                "unit": "USD",
            },
            "forecastedSpend": {
                "amount": faker.finance.amount(),
                "unit": "USD",
            },
        },
        "budgetType": "COST",
        "lastUpdatedTime": faker.date.recent(),
    };
}