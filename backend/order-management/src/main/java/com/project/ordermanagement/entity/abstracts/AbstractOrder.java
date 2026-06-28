package com.project.ordermanagement.entity.abstracts;

import java.math.BigDecimal;
import java.util.List;

// OOP Concept: Abstraction
public abstract class AbstractOrder {

    // Abstract method — subclasses provide their own total calculation (Polymorphism)
    public abstract BigDecimal calculateTotal(List<BigDecimal> itemPrices);

    // Concrete shared method
    public boolean isEligibleForDiscount(BigDecimal total) {
        return total.compareTo(new BigDecimal("500.00")) > 0;
    }
}