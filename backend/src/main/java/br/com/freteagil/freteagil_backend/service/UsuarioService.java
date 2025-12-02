package br.com.freteagil.freteagil_backend.service;

import br.com.freteagil.freteagil_backend.model.Usuario;
import br.com.freteagil.freteagil_backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;

    public UsuarioService(UsuarioRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public Usuario salvar(Usuario usuario) {
        // Se a senha não estiver criptografada, criptografar
        if (usuario.getSenha() != null && !usuario.getSenha().startsWith("$2a")) {
            usuario.setSenha(encoder.encode(usuario.getSenha()));
        }

        return repo.save(usuario);
    }

    public List<Usuario> listar() {return repo.findAll();}

    public Usuario buscarPorId(Long id) {return repo.findById(id).orElse(null);}

    public Usuario buscarPorEmail(String email) {return repo.findByEmail(email);}
}
