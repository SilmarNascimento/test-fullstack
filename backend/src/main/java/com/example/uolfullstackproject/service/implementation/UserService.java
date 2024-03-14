package com.example.uolfullstackproject.service.implementation;

import com.example.uolfullstackproject.exception.AlreadyExistsException;
import com.example.uolfullstackproject.exception.NotFoundException;
import com.example.uolfullstackproject.model.entity.User;
import com.example.uolfullstackproject.model.entity.UserStatus;
import com.example.uolfullstackproject.model.repository.UserRepository;
import com.example.uolfullstackproject.service.UserServiceInterface;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Page<User> findAllUsers(int pageNumber, int pageSize) {
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    return userRepository.findAll(pageable);
  }

  @Override
  public User findUserById(UUID userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new NotFoundException("Usuário não encontrado!"));
  }

  @Override
  public User createUser(User user) {
    userRepository.findByCpf(user.getCpf())
        .ifPresent(subjectFound -> {
          throw new AlreadyExistsException("Usuário já cadastrado!");
        });
    return userRepository.save(user);
  }

  @Override
  public User updateUser(UUID userId, User user) {
    User userFound = userRepository.findById(userId)
        .orElseThrow(() -> new NotFoundException("Usuário não encontrado!"));

    userFound.setStatus(user.getStatus());
    userFound.setName(user.getName());
    userFound.setEmail(user.getEmail());
    userFound.setTelephone(user.getTelephone());
    return userRepository.save(userFound);
  }

  @Override
  public void deleteUser(UUID userId) {
     userRepository.findById(userId)
        .orElseThrow(() -> new NotFoundException("Usuário não encontrado!"));
     userRepository.deleteById(userId);
  }
}
