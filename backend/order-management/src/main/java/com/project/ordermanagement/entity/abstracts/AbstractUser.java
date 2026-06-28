package com.project.ordermanagement.entity.abstracts;

import lombok.Getter;
import lombok.Setter;

// OOP Concept: Abstraction + Inheritance
@Getter
@Setter
public abstract class AbstractUser {

    protected String name;
    protected String email;
    protected String role;

    // Abstract method — subclasses must implement
    public abstract String getDisplayRole();

    // Common method available to all subclasses
    public String getWelcomeMessage() {
        return "Welcome, " + name + "! You are logged in as " + getDisplayRole();
    }
}