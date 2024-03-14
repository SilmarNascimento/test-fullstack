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
  @Query("SELECT user FROM User user WHERE (:query IS NULL OR user.name LIKE %:query%)")
  Page<User> findAll(@NonNull Pageable pageable, String query);

  Optional<User> findByCpf(String cpf);
}
