package br.com.freteagil.freteagil_backend.controller;

import br.com.freteagil.freteagil_backend.dto.LoginRequest;
import br.com.freteagil.freteagil_backend.model.Motorista;
import br.com.freteagil.freteagil_backend.model.Usuario;
import br.com.freteagil.freteagil_backend.repository.MotoristaRepository;
import br.com.freteagil.freteagil_backend.repository.UsuarioRepository;
import br.com.freteagil.freteagil_backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioRepository usuarioRepo;
    private final MotoristaRepository motoristaRepo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioRepository usuarioRepo,
                          MotoristaRepository motoristaRepo,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.motoristaRepo = motoristaRepo;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {

        if (login.getEmail() == null || login.getSenha() == null || login.getPerfil() == null) {
            return ResponseEntity.badRequest().body("Campos obrigatórios ausentes");
        }

        String perfil = login.getPerfil().toLowerCase();
        String email = login.getEmail();
        String senha = login.getSenha();

        if (perfil.equals("usuario")) {
            Usuario usuario = usuarioRepo.findByEmail(email);
            if (usuario != null && passwordEncoder.matches(senha, usuario.getSenha())) {
                String token = jwtUtil.generateToken(email, "USUARIO");
                return ResponseEntity.ok(token);
            }
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }

        if (perfil.equals("motorista")) {
            Motorista motorista = motoristaRepo.findByEmail(email);
            if (motorista != null && passwordEncoder.matches(senha, motorista.getSenha())) {
                String token = jwtUtil.generateToken(email, "MOTORISTA");
                return ResponseEntity.ok(token);
            }
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }

        return ResponseEntity.badRequest().body("Perfil inválido");
    }

}