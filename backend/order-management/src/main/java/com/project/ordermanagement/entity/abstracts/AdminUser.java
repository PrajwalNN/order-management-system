package com.project.ordermanagement.entity.abstracts;

// OOP Concept: Inheritance
public class AdminUser extends AbstractUser {

    public AdminUser(String name, String email) {
        this.name = name;
        this.email = email;
        this.role = "ADMIN";
    }

    @Override
    public String getDisplayRole() {
        return "Administrator";
    }
}