package com.hurios.huriosbackend.controller;

import com.hurios.huriosbackend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/*
 AuthController - expone endpoints que usan tu AuthService.
 - CORS habilitado en desarrollo con @CrossOrigin(origins = "*")
 - Cada método llama al AuthService y devuelve respuestas HTTP adecuadas.
*/
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // POST /auth/register
    // body: { "email": "...", "password": "..." }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        try {
            String msg = authService.register(email, password);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // POST /auth/login
    // body: { "email": "...", "password": "..." }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        Map<String, Object> res = authService.login(email, password);
        // authService comunica ok:false con message si falla
        boolean ok = Boolean.TRUE.equals(res.get("ok"));
        if (!ok) {
            // 401 para credenciales inválidas o usuario no encontrado
            return ResponseEntity.status(401).body(res);
        }
        return ResponseEntity.ok(res);
    }

    // POST /auth/send-verification-code  (envía código por email)
    // body: { "email": "..." }
    @PostMapping("/send-verification-code")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String,String> body) {
        try {
            String email = body.get("email");
            String msg = authService.sendVerificationCode(email);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // POST /auth/verify-code
    // body: { "email": "...", "code": "123456" }
    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String code = body.get("code");
        String msg = authService.verifyCode(email, code);
        if ("Email verificado".equals(msg)) {
            return ResponseEntity.ok(Map.of("message", msg));
        }
        return ResponseEntity.badRequest().body(Map.of("error", msg));
    }

    // POST /auth/request-password-reset
    // body: { "email": "..." }
    @PostMapping("/request-password-reset")
    public ResponseEntity<?> requestPasswordReset(@RequestBody Map<String,String> body) {
        try {
            String email = body.get("email");
            String msg = authService.requestPasswordReset(email);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // POST /auth/reset-password
    // body: { "email": "...", "token": "...", "newPassword": "..." }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String token = body.get("token");
        String newPassword = body.get("newPassword");
        String msg = authService.resetPassword(email, token, newPassword);
        if ("Contraseña actualizada".equals(msg)) {
            return ResponseEntity.ok(Map.of("message", msg));
        }
        return ResponseEntity.badRequest().body(Map.of("error", msg));
    }
}
