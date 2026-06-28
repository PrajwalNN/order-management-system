package com.project.ordermanagement.service;

import com.project.ordermanagement.dto.DashboardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductService productService;
    private final OrderService orderService;

    public DashboardResponse getDashboardData() {
        long totalProducts = productService.countProducts();
        long totalOrders = orderService.countOrders();
        long pendingOrders = orderService.countPendingOrders();
        long cancelledOrders = orderService.countCancelledOrders();

        return new DashboardResponse(totalProducts, totalOrders,
                pendingOrders, cancelledOrders);
    }
}