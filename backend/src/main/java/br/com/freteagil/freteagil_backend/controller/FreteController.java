package br.com.freteagil.freteagil_backend.controller;

import br.com.freteagil.freteagil_backend.model.Frete;
import br.com.freteagil.freteagil_backend.service.FreteService;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/fretes")
@CrossOrigin(origins = "*")
public class FreteController {

    private final FreteService service;

    public FreteController(FreteService service) {
        this.service = service;
    }

    // Criar nova solicitação de frete (usuário)
    @PostMapping
    public Frete solicitar(@RequestBody Frete frete) {
        frete.setStatus("SOLICITADO");
        return service.salvar(frete);
    }

    // Listar todos os fretes (admin ou debug)
    @GetMapping("/pendentes")
    public List<Frete> listarPendentes() {
        return service.listar();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Frete buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // Listar fretes de um usuário
    @GetMapping("/usuario/{usuarioId}")
    public List<Frete> listarPorUsuario(@PathVariable Long usuarioId) {
        return service.listarPorUsuario(usuarioId);
    }

    // Listar fretes de um motorista
    @GetMapping("/motorista/{motoristaId}")
    public List<Frete> listarPorMotorista(@PathVariable Long motoristaId) {
        return service.listarPorMotorista(motoristaId);
    }

    // Motorista aceita um frete
    @PatchMapping("/{id}/aceitar")
    public Frete aceitarFrete(@PathVariable Long id, @RequestBody Frete freteAtualizado) {
        Frete frete = service.buscarPorId(id);
        if (frete == null) return null;

        frete.setMotorista(freteAtualizado.getMotorista());
        frete.setStatus("ACEITO");
        return service.salvar(frete);
    }

    // Atualizar status (em andamento, concluído, cancelado)
    @PatchMapping("/{id}/status")
    public Frete atualizarStatus(@PathVariable Long id, @RequestBody String status) {
        Frete frete = service.buscarPorId(id);
        if (frete == null) return null;

        frete.setStatus(status.toUpperCase());
        return service.salvar(frete);
    }
}