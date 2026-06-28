package com.project.ordermanagement.dto;

public class DashboardResponse {

    private long totalProducts;
    private long totalOrders;
    private long pendingOrders;
    private long cancelledOrders;

    public DashboardResponse(long totalProducts, long totalOrders,
                              long pendingOrders, long cancelledOrders) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.pendingOrders = pendingOrders;
        this.cancelledOrders = cancelledOrders;
    }

    public long getTotalProducts() { return totalProducts; }
    public long getTotalOrders() { return totalOrders; }
    public long getPendingOrders() { return pendingOrders; }
    public long getCancelledOrders() { return cancelledOrders; }
}