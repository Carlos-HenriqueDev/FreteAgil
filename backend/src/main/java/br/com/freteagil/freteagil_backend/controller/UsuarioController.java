package br.com.freteagil.freteagil_backend.controller;

import br.com.freteagil.freteagil_backend.model.Usuario;
import br.com.freteagil.freteagil_backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    private final UsuarioService service;
    public UsuarioController(UsuarioService service) { this.service = service; }

    @PostMapping
    public Usuario cadastrar(@RequestBody Usuario usuario) {

        return service.salvar(usuario);
    }

    @GetMapping
    public List<Usuario> listar() { return service.listar(); }

    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Long id) { return service.buscarPorId(id); }
}