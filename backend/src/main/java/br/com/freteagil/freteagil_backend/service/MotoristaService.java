package br.com.freteagil.freteagil_backend.service;

import br.com.freteagil.freteagil_backend.model.Motorista;
import br.com.freteagil.freteagil_backend.repository.MotoristaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MotoristaService {

    private final MotoristaRepository repo;
    private final PasswordEncoder encoder;

    public MotoristaService(MotoristaRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public Motorista salvar(Motorista motorista) {

        // Se a senha não estiver criptografada, criptografar
        if (motorista.getSenha() != null && !motorista.getSenha().startsWith("$2a")) {
            motorista.setSenha(encoder.encode(motorista.getSenha()));
        }

        return repo.save(motorista);
    }

    public List<Motorista> listar() {
        return repo.findAll();
    }

    public Motorista buscarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Motorista buscarPorEmail(String email) {
        return repo.findByEmail(email);
    }


}