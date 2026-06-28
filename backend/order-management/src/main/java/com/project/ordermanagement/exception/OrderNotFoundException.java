package com.project.ordermanagement.exception;

public class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException(Long id) {
        super("Order not found with ID: " + id);
    }

    public OrderNotFoundException(String message) {
        super(message);
    }
}