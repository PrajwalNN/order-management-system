package com.project.ordermanagement.entity.abstracts;

import java.math.BigDecimal;
import java.util.List;

// OOP Concept: Polymorphism
public class StandardOrder extends AbstractOrder {

    @Override
    public BigDecimal calculateTotal(List<BigDecimal> itemPrices) {
        // Standard: sum of all item prices
        return itemPrices.stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}