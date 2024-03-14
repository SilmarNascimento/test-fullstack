package com.example.uolfullstackproject.service;

import com.example.uolfullstackproject.model.entity.User;
import java.util.UUID;
import org.springframework.data.domain.Page;

public interface UserServiceInterface {
  Page<User> findAllUsers(int pageNumber, int pageSize);
  User findUserById(UUID userId);
  User createUser(User subject);
  User updateUser(UUID userId, User subject);
  void deleteUser(UUID userId);
}
