package br.com.freteagil.freteagil_backend.controller;

import br.com.freteagil.freteagil_backend.model.Motorista;
import br.com.freteagil.freteagil_backend.service.MotoristaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motoristas")
@CrossOrigin(origins = "*")
public class MotoristaController {

    private final MotoristaService service;

    public MotoristaController(MotoristaService service) {
        this.service = service;
    }

    // Cadastrar motorista
    @PostMapping
    public Motorista cadastrar(@RequestBody Motorista motorista) {
        return service.salvar(motorista);
    }

    // Listar todos
    @GetMapping
    public List<Motorista> listar() {
        return service.listar();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Motorista buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // Atualizar veículo
    @PutMapping("/{id}/veiculo")
    public Motorista atualizarVeiculo(@PathVariable Long id, @RequestBody Motorista dadosVeiculo) {
        Motorista motorista = service.buscarPorId(id);
        if (motorista == null) {
            throw new RuntimeException("Motorista não encontrado");
        }

        motorista.setTipoCaminhao(dadosVeiculo.getTipoCaminhao());
        motorista.setModeloVeiculo(dadosVeiculo.getModeloVeiculo());
        motorista.setPlacaVeiculo(dadosVeiculo.getPlacaVeiculo());

        return service.salvar(motorista);
    }
}
