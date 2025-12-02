package br.com.freteagil.freteagil_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Motorista {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    private String senha;

    private String telefone;

    private String placaVeiculo;
    private String modeloVeiculo;
    private String tipoCaminhao; // ex: bau, aberto, carreta
}
