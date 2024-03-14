package com.example.uolfullstackproject.controller;

import com.example.uolfullstackproject.controller.dto.PageOutputDto;
import com.example.uolfullstackproject.controller.dto.UserInputDto;
import com.example.uolfullstackproject.controller.dto.UserOutputDto;
import com.example.uolfullstackproject.model.entity.User;
import com.example.uolfullstackproject.service.UserServiceInterface;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserServiceInterface userService;

  @Autowired
  public UserController(UserServiceInterface userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<PageOutputDto<UserOutputDto>> findAllUsers(
      @RequestParam(required = false, defaultValue = "0") int pageNumber,
      @RequestParam(required = false, defaultValue = "20") int pageSize
  ) {
    Page<User> usersPage = userService.findAllUsers(pageNumber, pageSize);
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(PageOutputDto.parseDto(
            usersPage,
            UserOutputDto::parseDto
        ));
  }

  @GetMapping("/{userId}")
  public ResponseEntity<UserOutputDto> findUserById(@PathVariable UUID userId) {
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(UserOutputDto.parseDto(userService.findUserById(userId)));
  }

  @PostMapping
  public ResponseEntity<UserOutputDto> createUser(@RequestBody UserInputDto userInputDto) {
    User userCreated = userService.createUser(User.parseUser(userInputDto));
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(UserOutputDto.parseDto(userCreated));
  }

  @PutMapping("/{userId}")
  public ResponseEntity<UserOutputDto> updateUserById(
      @PathVariable UUID userId,
      @RequestBody UserInputDto userInputDto
  ) {
    User updatedUser = userService.updateUser(userId, User.parseUser(userInputDto));
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(UserOutputDto.parseDto(updatedUser));
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<Void> deleteUserById(@PathVariable UUID userId) {
    userService.deleteUser(userId);
    return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .build();
  }
}
