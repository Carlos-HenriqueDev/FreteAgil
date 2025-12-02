package br.com.freteagil.freteagil_backend.repository;

import br.com.freteagil.freteagil_backend.model.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotoristaRepository extends JpaRepository<Motorista, Long> {
    Motorista findByEmail(String email);
}