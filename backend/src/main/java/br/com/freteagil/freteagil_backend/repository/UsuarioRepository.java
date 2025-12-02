package br.com.freteagil.freteagil_backend.repository;


import br.com.freteagil.freteagil_backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}