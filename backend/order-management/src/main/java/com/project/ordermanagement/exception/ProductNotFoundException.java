package com.project.ordermanagement.exception;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(Long id) {
        super("Product not found with ID: " + id);
    }

    public ProductNotFoundException(String message) {
        super(message);
    }
}