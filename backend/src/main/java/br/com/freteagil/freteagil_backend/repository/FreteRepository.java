package br.com.freteagil.freteagil_backend.repository;


import br.com.freteagil.freteagil_backend.model.Frete;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FreteRepository extends JpaRepository<Frete, Long> {
    List<Frete> findByUsuarioId(Long usuarioId);
    List<Frete> findByMotoristaIdAndStatusIn(Long motoristaId, List<String> status);
    List<Frete> findByMotoristaId(Long motoristaId);


}
