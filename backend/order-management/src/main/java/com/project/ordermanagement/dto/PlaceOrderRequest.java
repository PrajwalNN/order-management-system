package com.project.ordermanagement.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class PlaceOrderRequest {

    @NotEmpty(message = "Order must have at least one item")
    @Valid
    private List<OrderItemRequest> items;

    private boolean applyFestivalDiscount = false;

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
    public boolean isApplyFestivalDiscount() { return applyFestivalDiscount; }
    public void setApplyFestivalDiscount(boolean applyFestivalDiscount) {
        this.applyFestivalDiscount = applyFestivalDiscount;
    }
}