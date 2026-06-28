package com.project.ordermanagement.entity.abstracts;

import java.math.BigDecimal;
import java.util.List;

// OOP Concept: Polymorphism
public class DiscountedOrder extends AbstractOrder {

    private final BigDecimal discountRate;

    public DiscountedOrder(BigDecimal discountRate) {
        this.discountRate = discountRate;
    }

    @Override
    public BigDecimal calculateTotal(List<BigDecimal> itemPrices) {
        BigDecimal subtotal = itemPrices.stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal discount = subtotal.multiply(discountRate);
        return subtotal.subtract(discount);
    }
}