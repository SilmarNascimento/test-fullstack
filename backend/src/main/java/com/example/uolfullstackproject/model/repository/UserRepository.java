package com.example.uolfullstackproject.model.repository;

import com.example.uolfullstackproject.model.entity.User;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
  @NonNull
  Page<User> findAll(@NonNull Pageable pageable);

  Optional<User> findByCpf(String cpf);

  Optional<User> findByEmail(String email);
}
