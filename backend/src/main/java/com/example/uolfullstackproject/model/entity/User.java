package com.example.uolfullstackproject.model.entity;

import com.example.uolfullstackproject.controller.dto.UserInputDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  @GeneratedValue()
  private UUID id;

  private String name;

  @Column(unique = true)
  private String email;

  @Column(unique = true, updatable = false)
  private String cpf;

  private String telephone;

  private UserStatus status;

  public User(String name, String email, String cpf, String telephone, UserStatus status) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.telephone = telephone;
    this.status = status;
  }

  public User parseUser(UserInputDto userDto) {
    return new User(
        userDto.name(),
        userDto.email(),
        userDto.cpf(),
        userDto.telephone(),
        UserStatus.valueOf(userDto.status())
    );
  }
}
