package com.example.uolfullstackproject.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import static org.mockito.ArgumentMatchers.any;

import com.example.uolfullstackproject.exception.AlreadyExistsException;
import com.example.uolfullstackproject.exception.NotFoundException;
import com.example.uolfullstackproject.model.entity.User;
import com.example.uolfullstackproject.model.entity.UserStatus;
import com.example.uolfullstackproject.model.repository.UserRepository;
import java.util.List;
import java.util.Optional;
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
        "27997777008",
        UserStatus.valueOf("ATIVO")
    );
    mockUser02 = new User(
        mockUserId02,
        "William Barbosa",
        "will.barbosa@gmail.com",
        "13152742647",
        "27982820082",
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

  @Test
  @DisplayName("Verifica se é retornado a entidade User por seu Id")
  public void findUserByIdTest() {
    Mockito
        .when(userRepository.findById(any()))
        .thenReturn(Optional.of(mockUser01));

    User serviceResponse = userService.findUserById(mockUserId01);

    assertEquals(mockUser01, serviceResponse);
    assertEquals(mockUserId01, serviceResponse.getId());
    assertEquals(mockUser01.getName(), serviceResponse.getName());
    assertEquals(mockUser01.getEmail(), serviceResponse.getEmail());
    assertEquals(mockUser01.getCpf(), serviceResponse.getCpf());
    assertEquals(mockUser01.getTelephone(), serviceResponse.getTelephone());
    assertEquals(mockUser01.getStatus(), serviceResponse.getStatus());

    Mockito
        .verify(userRepository, Mockito.times(1))
        .findById(any(UUID.class));
  }

  @Test
  @DisplayName("Verifica se ocorre o disparo de uma exceção caso não se encontre uma entidade User por seu Id")
  public void findUserByIdTestError() {
    Mockito
        .when(userRepository.findById(mockUserId01))
        .thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> userService.findUserById(mockUserId01));

    Mockito
        .verify(userRepository, Mockito.times(1))
        .findById(any(UUID.class));
  }

  @Test
  @DisplayName("Verifica se é criado uma a entidade User")
  public void createUserTest() {
    Mockito
        .when(userRepository.findByCpf(mockUser01.getCpf()))
        .thenReturn(Optional.empty());

    Mockito
        .when(userRepository.save(any(User.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));

    User serviceResponse = userService.createUser(mockUser01);

    assertNotNull(serviceResponse);
    assertEquals(mockUserId01, serviceResponse.getId());
    assertEquals(mockUser01.getName(), serviceResponse.getName());
    assertEquals(mockUser01.getEmail(), serviceResponse.getEmail());
    assertEquals(mockUser01.getCpf(), serviceResponse.getCpf());
    assertEquals(mockUser01.getTelephone(), serviceResponse.getTelephone());
    assertEquals(mockUser01.getStatus(), serviceResponse.getStatus());

    Mockito
        .verify(userRepository)
        .findByCpf(any(String.class));
    Mockito
        .verify(userRepository)
        .save(any(User.class));
  }

  @Test
  @DisplayName("Verifica se é disparado uma exceção ao tentar criar uma a entidade User já existente pelo cpf")
  public void createSubjectTestCPFError() {
    Mockito
        .when(userRepository.findByCpf(mockUser01.getCpf()))
        .thenReturn(Optional.of(mockUser01));

    assertThrows(AlreadyExistsException.class, () -> userService.createUser(mockUser01));

    Mockito
        .verify(userRepository)
        .findByCpf(any(String.class));
  }

  @Test
  @DisplayName("Verifica se é disparado uma exceção ao tentar criar uma a entidade User já existente pelo email")
  public void createSubjectTestEmailError() {
    Mockito
        .when(userRepository.findByEmail(mockUser01.getEmail()))
        .thenReturn(Optional.of(mockUser01));

    assertThrows(AlreadyExistsException.class, () -> userService.createUser(mockUser01));

    Mockito
        .verify(userRepository)
        .findByCpf(any(String.class));
  }

  @Test
  @DisplayName("Verifica se é retornado uma a entidade User atualizada")
  public void updateUserTest() {
    Mockito
        .when(userRepository.findById(mockUserId01))
        .thenReturn(Optional.of(mockUser01));

    Mockito
        .when(userRepository.save(any(User.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));

    User serviceResponse = userService.updateUser(mockUserId01, mockUser02);

    assertNotNull(serviceResponse);
    assertNotEquals(mockUser02.getId(), serviceResponse.getId());
    assertEquals(mockUserId01, serviceResponse.getId());
    assertEquals(mockUser02.getName(), serviceResponse.getName());
    assertEquals(mockUser02.getEmail(), serviceResponse.getEmail());
    assertNotEquals(mockUser02.getCpf(), serviceResponse.getCpf());
    assertEquals(mockUser01.getCpf(), serviceResponse.getCpf());
    assertEquals(mockUser02.getTelephone(), serviceResponse.getTelephone());
    assertEquals(mockUser02.getStatus(), serviceResponse.getStatus());

    Mockito
        .verify(userRepository)
        .findById(any(UUID.class));
    Mockito
        .verify(userRepository)
        .save(any(User.class));
  }

  @Test
  @DisplayName("Verifica se é disparado uma exceção ao tentar atualizar uma a entidade User não existente")
  public void updateUserTestError() {
    Mockito
        .when(userRepository.findById(mockUserId01))
        .thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> userService.updateUser(mockUserId01, mockUser02));

    Mockito
        .verify(userRepository)
        .findById(any(UUID.class));
  }

  @Test
  @DisplayName("Verifica se uma entidade User foi deletada do banco de dados")
  public void deleteUserTest() {
    Mockito
        .when(userRepository.findById(mockUserId01))
        .thenReturn(Optional.of(mockUser01));

    userService.deleteUser(mockUserId01);

    Mockito
        .verify(userRepository)
        .deleteById(any(UUID.class));
  }

  @Test
  @DisplayName("Verifica se é disparado uma exceção ao tentar deletar uma a entidade User não existente")
  public void deleteUserTestError() {
    Mockito
        .when(userRepository.findById(mockUserId01))
        .thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> userService.deleteUser(mockUserId01));

    Mockito
        .verify(userRepository)
        .findById(any(UUID.class));
  }
}
