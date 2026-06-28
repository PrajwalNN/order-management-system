package com.project.ordermanagement.entity.abstracts;

import java.math.BigDecimal;

// OOP Concept: Interface Implementation
public class FestivalDiscount implements DiscountStrategy {

    private static final BigDecimal FESTIVAL_DISCOUNT_RATE = new BigDecimal("0.10");

    @Override
    public BigDecimal applyDiscount(BigDecimal originalPrice) {
        BigDecimal discount = originalPrice.multiply(FESTIVAL_DISCOUNT_RATE);
        return originalPrice.subtract(discount);
    }

    @Override
    public String getDiscountDescription() {
        return "Festival Discount: 10% off on total order";
    }
}