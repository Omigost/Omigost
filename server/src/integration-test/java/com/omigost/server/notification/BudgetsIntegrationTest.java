package com.omigost.server.notification;

import com.amazonaws.services.budgets.AWSBudgets;
import com.amazonaws.services.budgets.model.CreateBudgetRequest;
import com.omigost.server.config.AWSLocalstackConfig;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.config.AWSLocalstackConfig;
import com.omigost.server.config.AppConfig;
import com.omigost.server.rest.BudgetController;
import org.junit.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

@ActiveProfiles("dev")
@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(initializers = {AWSLocalstackConfig.Initializer.class})
public class BudgetsIntegrationTest {

    @Autowired
    private BudgetService budgetService;

    @Test
    public void testBudgetsService() {
        budgetService.createBudget(100, new ArrayList<String>(){{
            add("abc");
        }});

        System.out.println("RESULT ---> ");
        System.out.println(budgetService.getBudgets());
    }
}
