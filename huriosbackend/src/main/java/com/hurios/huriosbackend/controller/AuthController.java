package com.hurios.huriosbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.hurios.huriosbackend.dto.AuthDtos.*;
import com.hurios.huriosbackend.service.AuthService;

import java.util.Map;

/*
 * AuthController: expone los endpoints REST que consume el frontend.
 * Endpoints:
 * - POST /auth/register
 * - POST /auth/login         -> devuelve token en caso de éxito
 * - POST /auth/send-verification
 * - POST /auth/verify-code
 * - POST /auth/request-reset
 * - POST /auth/reset-password
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Dev: permitir peticiones desde el frontend local (cambiar en prod)
public class AuthController {

    private final AuthService authService;

    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Registro
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto dto) {
        try {
            String msg = authService.register(dto.email, dto.password);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (Exception e) {
            // loggear e en consola en dev
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Error interno"));
        }
    }

    // Login: ahora puede devolver token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        Map<String, Object> res = authService.login(dto.email, dto.password);
        boolean ok = Boolean.TRUE.equals(res.get("ok"));
        if (ok) {
            // devuelve token en JSON: { message, token }
            return ResponseEntity.ok(Map.of("message", res.get("message"), "token", res.get("token")));
        } else {
            String msg = (String) res.get("message");
            if ("not_verified".equals(msg)) {
                // 403 para indicar no verificado (frontend lo detecta y muestra flujo de verificación)
                return ResponseEntity.status(403).body(Map.of("message", "not_verified"));
            }
            // otros errores
            return ResponseEntity.status(400).body(Map.of("message", msg));
        }
    }

    // enviar código de verificación
    @PostMapping("/send-verification")
    public ResponseEntity<?> sendVerification(@RequestBody EmailDto dto) {
        try {
            String msg = authService.sendVerificationCode(dto.email);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Error interno"));
        }
    }

    // verificar código
    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody VerifyCodeDto dto) {
        String res = authService.verifyCode(dto.email, dto.code);
        if ("Email verificado".equals(res)) {
            return ResponseEntity.ok(Map.of("message", res));
        }
        return ResponseEntity.status(400).body(Map.of("message", res));
    }

    // request reset
    @PostMapping("/request-reset")
    public ResponseEntity<?> requestReset(@RequestBody ResetRequestDto dto) {
        try {
            String msg = authService.requestPasswordReset(dto.email);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Error interno"));
        }
    }

    // reset password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetDto dto) {
        String res = authService.resetPassword(dto.email, dto.token, dto.newPassword);
        if ("Contraseña actualizada".equals(res)) {
            return ResponseEntity.ok(Map.of("message", res));
        }
        return ResponseEntity.status(400).body(Map.of("message", res));
    }
}
