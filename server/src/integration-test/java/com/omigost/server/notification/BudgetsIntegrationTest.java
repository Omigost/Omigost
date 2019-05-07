package com.omigost.server.notification;

import com.omigost.server.DevConfigTestTemplate;
import com.omigost.server.aws.BudgetService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

public class BudgetsIntegrationTest extends DevConfigTestTemplate {

    @Autowired
    private BudgetService budgetService;

    @Test
    public void testBudgetsService() {
        budgetService.createBudget(100, new ArrayList<String>() {{
            add("abc");
        }});

        System.out.println("RESULT ---> ");
        System.out.println(budgetService.getBudgets());
    }
}
