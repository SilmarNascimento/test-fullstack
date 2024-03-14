package com.example.uolfullstackproject.controller;

import com.example.uolfullstackproject.controller.dto.PageOutputDto;
import com.example.uolfullstackproject.controller.dto.UserOutputDto;
import com.example.uolfullstackproject.model.entity.User;
import com.example.uolfullstackproject.service.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserServiceInterface userService;

  public UserController(UserServiceInterface userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<PageOutputDto<UserOutputDto>> findAllUsers(
      @RequestParam(required = false, defaultValue = "0") int pageNumber,
      @RequestParam(required = false, defaultValue = "20") int pageSize
  ) {
    Page<User> usersPage = userService.findAllSubjects(pageNumber, pageSize);
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(PageOutputDto.parseDto(
            usersPage,
            UserOutputDto::parseDto
        ));
  }
}
