package br.jdl.projetofinal.teste.react.repository;

import br.jdl.projetofinal.teste.react.domain.Predio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Predio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PredioRepository extends JpaRepository<Predio, Long> {

}
