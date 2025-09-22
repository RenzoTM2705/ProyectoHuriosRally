package com.hurios.huriosbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HuriosbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HuriosbackendApplication.class, args);
		//hola  diego
		//segundo comentario
		
	}

	// Método agregado como ejemplo
	public static void saludar() {
		System.out.println("¡Hola desde HuriosbackendApplication!");
	}
}
