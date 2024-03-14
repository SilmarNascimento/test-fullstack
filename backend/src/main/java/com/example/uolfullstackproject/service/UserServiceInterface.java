package com.example.uolfullstackproject.service;

import com.example.uolfullstackproject.model.entity.User;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;

public interface UserServiceInterface {
  Page<User> findAllSubjects(int pageNumber, int pageSize);
  User findSubjectById(UUID subjectId);
  User createSubject(User subject);
  User updateSubject(UUID subjectId, User subject);
  void deleteSubject(UUID subjectId);
}
