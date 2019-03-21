package com.omigost.server.model;

import com.amazonaws.services.budgets.model.Budget;
import lombok.experimental.Delegate;
import org.springframework.util.MultiValueMap;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

// TODO should this be here or in AWS? If in AWS, reorganize code - split models and services in sections
public class BudgetDecorator extends Budget {
    @Delegate(types=Budget.class)
    public final Budget budget;

    public final static String LINKED_ACCOUNT_FILTER = "LinkedAccount";
    public final static String TAG_FILTER = "TagKeyValue";

    public BudgetDecorator (Budget budget) {
        this.budget = budget;
    }

    public BudgetDecorator setLinkedAccountsFilter(List<String> linkedAccountsFilter) {
        addCostFiltersEntry(LINKED_ACCOUNT_FILTER, linkedAccountsFilter);
        return this;
    }

    public List<String> getLinkedAccountsFilter() {
        return getCostFilters().get(LINKED_ACCOUNT_FILTER);
    }

    public List<String> getTagsFilter() {
        return getCostFilters().get(TAG_FILTER);
    }

    public Boolean isOverrun() {
        BigDecimal actualSpend = getCalculatedSpend().getActualSpend().getAmount();
        BigDecimal budgetLimit = getBudgetLimit().getAmount();
        return budgetLimit.compareTo(actualSpend) < 0;
    }

    public BudgetDecorator setTagsFilter(MultiValueMap<String, String> tagsFilter) {
        ArrayList<String> tagsFilterList = new ArrayList<>();
        tagsFilter.entrySet().forEach(entry -> {
            for (String tagValue : entry.getValue()) {
                tagsFilterList.add(entry.getKey() + "$" + tagValue);
            }
        });
        addCostFiltersEntry(TAG_FILTER, tagsFilterList);
        return this;
    }

}
