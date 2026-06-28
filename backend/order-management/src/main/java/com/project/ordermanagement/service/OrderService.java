package com.project.ordermanagement.service;

import com.project.ordermanagement.dto.*;
import com.project.ordermanagement.entity.*;
import com.project.ordermanagement.entity.abstracts.*;
import com.project.ordermanagement.exception.OrderNotFoundException;
import com.project.ordermanagement.exception.ProductNotFoundException;
import com.project.ordermanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest request, String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // OOP: Collections Framework - List
        List<BigDecimal> itemPrices = new ArrayList<>();
        List<OrderItem> orderItems = new ArrayList<>();

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");
        order.setTotalAmount(BigDecimal.ZERO);

        Order savedOrder = orderRepository.save(order);

        for (OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ProductNotFoundException(itemReq.getProductId()));

            if (product.getStock() < itemReq.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            // Reduce stock
            product.setStock(product.getStock() - itemReq.getQuantity());
            productRepository.save(product);

            BigDecimal subtotal = product.getPrice()
                    .multiply(new BigDecimal(itemReq.getQuantity()));
            itemPrices.add(subtotal);

            // OOP: Encapsulation
            OrderItem item = new OrderItem();
            item.setOrder(savedOrder);
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());
            item.setUnitPrice(product.getPrice());
            orderItems.add(item);
        }

        orderItemRepository.saveAll(orderItems);

        // OOP: Polymorphism - choosing order calculation strategy
        AbstractOrder orderCalculator;
        if (request.isApplyFestivalDiscount()) {
            // OOP: Interface - DiscountStrategy
            DiscountStrategy discountStrategy = new FestivalDiscount();
            orderCalculator = new DiscountedOrder(new BigDecimal("0.10"));
            System.out.println(discountStrategy.getDiscountDescription());
        } else {
            orderCalculator = new StandardOrder();
        }

        BigDecimal total = orderCalculator.calculateTotal(itemPrices);
        savedOrder.setTotalAmount(total);
        savedOrder.setOrderItems(orderItems);
        orderRepository.save(savedOrder);

        return mapToResponse(savedOrder, orderItems);
    }

    // OOP: Collections - List
    public List<OrderResponse> getUserOrders(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderRepository.findByUser(user);
        return orders.stream()
                .map(o -> {
                    List<OrderItem> items = orderItemRepository.findByOrderId(o.getId());
                    return mapToResponse(o, items);
                })
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(o -> {
                    List<OrderItem> items = orderItemRepository.findByOrderId(o.getId());
                    return mapToResponse(o, items);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse cancelOrder(Long orderId, String userEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        if (!order.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not authorized to cancel this order");
        }

        if (order.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Order is already cancelled");
        }

        // Restore stock
        List<OrderItem> items = orderItemRepository.findByOrderId(orderId);
        for (OrderItem item : items) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        }

        order.setStatus("CANCELLED");
        orderRepository.save(order);

        return mapToResponse(order, items);
    }

    public long countOrders() {
        return orderRepository.count();
    }

    public long countPendingOrders() {
        return orderRepository.countByStatus("PENDING");
    }

    public long countCancelledOrders() {
        return orderRepository.countByStatus("CANCELLED");
    }

    private OrderResponse mapToResponse(Order order, List<OrderItem> items) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setStatus(order.getStatus());
        response.setTotalAmount(order.getTotalAmount());
        response.setCreatedAt(order.getCreatedAt());
        response.setUserName(order.getUser().getName());

        List<OrderItemResponse> itemResponses = items.stream().map(item -> {
            OrderItemResponse ir = new OrderItemResponse();
            ir.setId(item.getId());
            ir.setProductId(item.getProduct().getId());
            ir.setProductName(item.getProduct().getName());
            ir.setQuantity(item.getQuantity());
            ir.setUnitPrice(item.getUnitPrice());
            ir.setSubtotal(item.getUnitPrice()
                    .multiply(new BigDecimal(item.getQuantity())));
            return ir;
        }).collect(Collectors.toList());

        response.setItems(itemResponses);
        return response;
    }
}