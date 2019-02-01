package br.jdl.projetofinal.teste.react.repository;

import br.jdl.projetofinal.teste.react.domain.Sala;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Sala entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {

}
