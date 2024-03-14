package com.example.uolfullstackproject.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import static org.mockito.ArgumentMatchers.any;

import com.example.uolfullstackproject.model.entity.User;
import com.example.uolfullstackproject.model.entity.UserStatus;
import com.example.uolfullstackproject.model.repository.UserRepository;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
  @Autowired
  private UserServiceInterface userService;
  @MockBean
  private UserRepository userRepository;

  private UUID mockUserId01;
  private UUID mockUserId02;
  private User mockUser01;
  private User mockUser02;

  @BeforeEach
  public void setUp() {
    mockUserId01 = UUID.randomUUID();
    mockUserId02 = UUID.randomUUID();

    mockUser01 = new User(
        mockUserId01,
        "Cainã Jucá",
        "caina.juca@gmail.com",
        "26252833756",
        "27999999008",
        UserStatus.valueOf("ATIVO")
    );
    mockUser02 = new User(
        mockUserId02,
        "William Barbosa",
        "will.barbosa@gmail.com",
        "13152742647",
        "27999999008",
        UserStatus.valueOf("AGUARDANDO_ATIVACAO")
    );
  }

  @Test
  @DisplayName("Verifica se é retornado uma página com uma lista de todas as entidades Users")
  public void findAllUsersTest() {
    int pageNumber = 0;
    int pageSize = 2;

    Pageable mockPageable = PageRequest.of(pageNumber, pageSize);
    Page<User> page = Mockito.mock(Page.class);

    Mockito
        .when(page.getContent())
        .thenReturn(List.of(mockUser01, mockUser02));

    Mockito
        .when(userRepository.findAll(mockPageable))
        .thenReturn(page);

    Page<User> serviceResponse = userService.findAllUsers(pageNumber, pageSize);

    assertFalse(serviceResponse.isEmpty());
    assertInstanceOf(Page.class, serviceResponse);
    assertEquals(pageNumber, serviceResponse.getNumber());
    assertEquals(pageSize, serviceResponse.getContent().size());

    List<User> userList = serviceResponse.getContent();
    assertEquals(userList.get(0).getId(), mockUserId01);
    assertEquals(userList.get(1).getId(), mockUserId02);
    assertEquals(userList.get(0), mockUser01);
    assertEquals(userList.get(1), mockUser02);

    Mockito
        .verify(userRepository, Mockito.times(1))
        .findAll(any(Pageable.class));
  }
}
