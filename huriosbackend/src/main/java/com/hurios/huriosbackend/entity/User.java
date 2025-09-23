package com.hurios.huriosbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
 * Entidad User:
 * - Mapea la tabla 'users'
 * - Almacena email, hash de contraseña y bandera isVerified
 * - createdAt / updatedAt para auditoría simple
 */
@Entity
@Table(name = "users")
public class User {

    // Primary key autogenerado (AUTO_INCREMENT en MySQL)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Email único y no nulo
    @Column(nullable = false, unique = true)
    private String email;

    // Almacena el hash de la contraseña (BCrypt)
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // Indica si el email fue verificado
    @Column(name = "is_verified", nullable = false)
    private boolean isVerified = false;

    // Fechas de creación / actualización (no manejadas automáticamente aquí)
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // ---------- Constructores ----------
    public User() {
        // constructor vacío requerido por JPA
    }

    // ---------- Getters y Setters ----------
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // passwordHash
    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    // isVerified
    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    // createdAt
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // updatedAt
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // ---------- Utilidades opcionales ----------
    @PreUpdate
    public void preUpdate() {
        // actualizar la marca de tiempo cada vez que JPA actualiza la entidad
        this.updatedAt = LocalDateTime.now();
    }
}
