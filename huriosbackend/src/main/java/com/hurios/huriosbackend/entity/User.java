package com.hurios.huriosbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
 User: entidad JPA que representa usuarios en la BD.
 - id: PK autogenerada
 - email: único
 - passwordHash: contraseña encriptada (BCrypt)
 - isVerified: (opcional) para verificación por correo
 - createdAt / updatedAt: timestamps
*/
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "is_verified", nullable = false)
    private boolean isVerified = true; // por ahora true para evitar flow de verificación

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // getters y setters
    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getEmail(){return email;}
    public void setEmail(String email){this.email = email;}

    public String getPasswordHash(){return passwordHash;}
    public void setPasswordHash(String passwordHash){this.passwordHash = passwordHash;}

    public boolean isVerified(){return isVerified;}
    public void setVerified(boolean verified){isVerified = verified;}

    public LocalDateTime getCreatedAt(){return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt){this.createdAt = createdAt;}

    public LocalDateTime getUpdatedAt(){return updatedAt;}
    public void setUpdatedAt(LocalDateTime updatedAt){this.updatedAt = updatedAt;}
}
