package com.example.uolfullstackproject.service.implementation;

import com.example.uolfullstackproject.exception.AlreadyExistsException;
import com.example.uolfullstackproject.exception.NotFoundException;
import com.example.uolfullstackproject.model.entity.User;
import com.example.uolfullstackproject.model.repository.UserRepository;
import com.example.uolfullstackproject.service.UserServiceInterface;
import java.util.List;
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
  public Page<User> findAllSubjects(int pageNumber, int pageSize) {
    Pageable pageable = PageRequest.of(pageNumber, pageSize);
    return userRepository.findAll(pageable);
  }

  @Override
  public User findSubjectById(UUID userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new NotFoundException("Usuário não encontrado!"));
  }

  @Override
  public User createSubject(User user) {
    userRepository.findByCpf(user.getCpf())
        .ifPresent(subjectFound -> {
          throw new AlreadyExistsException("Usuário já cadastrado!");
        });
    return userRepository.save(user);
  }

  @Override
  public User updateSubject(UUID subjectId, User subject) {
    return null;
  }

  @Override
  public void deleteSubject(UUID subjectId) {

  }
}
