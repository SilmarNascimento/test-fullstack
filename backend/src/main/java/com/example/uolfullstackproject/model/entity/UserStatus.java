package com.example.uolfullstackproject.model.entity;

import lombok.Getter;

@Getter
public enum UserStatus {
  ATIVO("Ativo"),
  INATIVO("Inativo"),
  AGUARDANDO_ATIVACAO("Aguardando ativação"),
  DESATIVADO("Desativado");

  private final String label;

  private UserStatus(String label) {
    this.label = label;
  }

  public static UserStatus parseStatus(String status) {
    for (UserStatus userStatus : UserStatus.values()) {
      if (userStatus.getLabel().equalsIgnoreCase(status)) {
        return userStatus;
      }
    }
    throw new IllegalArgumentException("Status inválido: " + status);
  }

}
