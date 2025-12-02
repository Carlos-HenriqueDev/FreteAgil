package br.com.freteagil.freteagil_backend.service;

import br.com.freteagil.freteagil_backend.model.Frete;
import br.com.freteagil.freteagil_backend.repository.FreteRepository;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class FreteService {

    private final FreteRepository repo;

    public FreteService(FreteRepository repo) {
        this.repo = repo;
    }

    public Frete salvar(Frete frete) {
        return repo.save(frete);
    }

    public List<Frete> listar() {
        return repo.findAll();
    }

    public Frete buscarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Frete> listarPorUsuario(Long usuarioId) {
        return repo.findByUsuarioId(usuarioId);
    }


    public List<Frete> listarPorMotorista(Long motoristaId) {
        return repo.findByMotoristaId(motoristaId);
    }


    public List<Frete> listarFretesAceitos(Long motoristaId) {
        List<String> statusAceitos = List.of("ACEITO", "EM_ANDAMENTO");
        return repo.findByMotoristaIdAndStatusIn(motoristaId, statusAceitos);
    }

}
