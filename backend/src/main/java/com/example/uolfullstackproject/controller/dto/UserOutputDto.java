package com.example.uolfullstackproject.controller.dto;

import com.example.uolfullstackproject.model.entity.User;
import com.example.uolfullstackproject.model.entity.UserStatus;
import java.util.UUID;

public record UserOutputDto(
  UUID id,
  String name,
  String email,
  String cpf,
  String telephone,
  UserStatus status
) {
  public static UserOutputDto parseDto(User user) {
    return new UserOutputDto(
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getCpf(),
        user.getTelephone(),
        user.getStatus()
    );
  }
}
