package br.jdl.projetofinal.teste.react.repository;

import br.jdl.projetofinal.teste.react.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
