package com.hurios.huriosbackend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.IOException;
import java.util.Collections;

/*
 * JwtAuthFilter: filtro que intercepta requests, lee el header Authorization,
 * valida el JWT con JwtUtil y, si es válido, coloca una Authentication simple
 * en el SecurityContext para que Spring conozca la identidad del request.
 *
 * Nota: este filtro NO hace control de permisos (roles) aquí; eso se puede
 * añadir si lo necesitas.
 */
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Leer header Authorization
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7); // quitar "Bearer "
            try {
                // validar y obtener subject (p.ej. userId o email)
                String subject = jwtUtil.validateAndGetSubject(token);

                // Crear Authentication simple (principal = subject)
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(subject, null, Collections.emptyList());

                // Colocar en el contexto
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception ex) {
                // Si el token es inválido/expirado, no autenticamos; dejamos que
                // la cadena continúe y Spring responda 401 si la ruta requiere auth.
                // También podríamos detener la petición y forzar 401 aquí.
            }
        }

        // continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
