package com.project.ordermanagement.entity.abstracts;

// OOP Concept: Inheritance
public class CustomerUser extends AbstractUser {

    public CustomerUser(String name, String email) {
        this.name = name;
        this.email = email;
        this.role = "CUSTOMER";
    }

    @Override
    public String getDisplayRole() {
        return "Customer";
    }
}