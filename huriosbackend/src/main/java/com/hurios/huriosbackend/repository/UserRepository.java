package com.hurios.huriosbackend.repository;

import com.hurios.huriosbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/*
 * UserRepository: repositorio Spring Data para User.
 * - JpaRepository proporciona CRUD básico y paginación.
 * - Aquí añadimos un finder por email.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
