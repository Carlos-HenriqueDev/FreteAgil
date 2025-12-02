package br.com.freteagil.freteagil_backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Frete {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private Motorista motorista; // pode ser null enquanto não aceito

    private String origem;
    private String destino;
    private Double preco;
    private String status; // SOLICITADO, ACEITO, EM_ANDAMENTO, CONCLUIDO, CANCELADO

    private LocalDateTime dataSolicitacao = LocalDateTime.now();


    private String tipoTransporte;
    private String itensGrandes;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataTransporte;
}
