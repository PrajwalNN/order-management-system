package com.project.ordermanagement.entity.abstracts;

import java.math.BigDecimal;

// OOP Concept: Interface
public interface DiscountStrategy {
    BigDecimal applyDiscount(BigDecimal originalPrice);
    String getDiscountDescription();
}