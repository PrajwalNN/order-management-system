package com.project.ordermanagement.controller;

import com.project.ordermanagement.dto.ApiResponse;
import com.project.ordermanagement.dto.OrderResponse;
import com.project.ordermanagement.dto.PlaceOrderRequest;
import com.project.ordermanagement.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order Management APIs")
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Place a new order")
    public ResponseEntity<ApiResponse<OrderResponse>> placeOrder(
            @Valid @RequestBody PlaceOrderRequest request,
            Authentication authentication) {
        String userEmail = authentication.getName();
        OrderResponse response = orderService.placeOrder(request, userEmail);
        return ResponseEntity.ok(ApiResponse.success("Order placed successfully", response));
    }

    @GetMapping("/my-orders")
    @Operation(summary = "Get logged-in user's orders")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getMyOrders(
            Authentication authentication) {
        String userEmail = authentication.getName();
        List<OrderResponse> orders = orderService.getUserOrders(userEmail);
        return ResponseEntity.ok(ApiResponse.success("Orders fetched", orders));
    }

    @GetMapping
    @Operation(summary = "Get all orders (Admin)")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ResponseEntity.ok(ApiResponse.success("All orders fetched", orders));
    }

    @PutMapping("/{id}/cancel")
    @Operation(summary = "Cancel an order")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @PathVariable Long id,
            Authentication authentication) {
        String userEmail = authentication.getName();
        OrderResponse response = orderService.cancelOrder(id, userEmail);
        return ResponseEntity.ok(ApiResponse.success("Order cancelled successfully", response));
    }
}