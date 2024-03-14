package com.example.uolfullstackproject.controller;

import com.example.uolfullstackproject.controller.dto.UserInputDto;
import com.example.uolfullstackproject.exception.AlreadyExistsException;
import com.example.uolfullstackproject.exception.NotFoundException;
import com.example.uolfullstackproject.model.entity.User;
import com.example.uolfullstackproject.model.entity.UserStatus;
import com.example.uolfullstackproject.service.UserServiceInterface;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class UserControllerTests {
  @Autowired
  MockMvc mockMvc;

  @MockBean
  private UserServiceInterface userService;

  private String baseUrl;
  private ObjectMapper objectMapper;
  private UUID mockUserId01;
  private UUID mockUserId02;
  private User mockUser01;
  private User mockUser02;

  @BeforeEach
  public void setUp() {
    baseUrl = "/api/users";
    objectMapper = new ObjectMapper();
    mockUserId01 = UUID.randomUUID();
    mockUserId02 = UUID.randomUUID();

    mockUser01 =  new User(
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
  @DisplayName("Verifica se é retornado uma lista paginada das entidades User com default parameters")
  public void findAllUsersDefaultParametersTest() throws Exception {
    int pageNumber = 0;
    int pageSize = 20;
    long totalItems = 2;

    Page<User> page = Mockito.mock(Page.class);
    List<User> pageContent = List.of(mockUser01, mockUser02);

    Mockito
        .when(page.getNumberOfElements())
        .thenReturn(pageContent.size());
    Mockito
        .when(page.getTotalElements())
        .thenReturn(totalItems);
    Mockito
        .when(page.getTotalPages())
        .thenReturn(1);
    Mockito
        .when(page.getContent())
        .thenReturn(pageContent);

    Mockito
        .when(userService.findAllUsers(anyInt(), anyInt()))
        .thenReturn(page);

    ResultActions httpResponse = mockMvc.perform(get(baseUrl));

    httpResponse
        .andExpect(status().is(200))
        .andExpect(jsonPath("$.pageItems").value(pageContent.size()))
        .andExpect(jsonPath("$.totalItems").value(totalItems))
        .andExpect(jsonPath("$.pages").value(1))
        .andExpect(jsonPath("$.data", isA(List.class)))
        .andExpect(jsonPath("$.data.[0].id").value(mockUserId01.toString()))
        .andExpect(jsonPath("$.data.[0].name").value(mockUser01.getName()))
        .andExpect(jsonPath("$.data.[0].email").value(mockUser01.getEmail()))
        .andExpect(jsonPath("$.data.[0].cpf").value(mockUser01.getCpf()))
        .andExpect(jsonPath("$.data.[0].telephone").value(mockUser01.getTelephone()))
        .andExpect(jsonPath("$.data.[0].status").value(mockUser01.getStatus().toString()))
        .andExpect(jsonPath("$.data.[1].id").value(mockUserId02.toString()))
        .andExpect(jsonPath("$.data.[1].name").value(mockUser02.getName()))
        .andExpect(jsonPath("$.data.[1].email").value(mockUser02.getEmail()))
        .andExpect(jsonPath("$.data.[1].cpf").value(mockUser02.getCpf()))
        .andExpect(jsonPath("$.data.[1].telephone").value(mockUser02.getTelephone()))
        .andExpect(jsonPath("$.data.[1].status").value(mockUser02.getStatus().toString()));

    ArgumentCaptor<Integer> pageNumberCaptor = ArgumentCaptor.forClass(Integer.class);
    ArgumentCaptor<Integer> pageSizeCaptor = ArgumentCaptor.forClass(Integer.class);
    Mockito
        .verify(userService, Mockito.times(1))
        .findAllUsers(pageNumberCaptor.capture(), pageSizeCaptor.capture());

    assertEquals(pageNumber, pageNumberCaptor.getValue());
    assertEquals(pageSize, pageSizeCaptor.getValue());
  }

  @Test
  @DisplayName("Verifica se é retornado uma lista paginada das entidades User com parâmetros de página")
  public void findAllUsersPaginationParametersTest() throws Exception {
    int pageNumber = 0;
    int pageSize = 2;
    long totalItems = 2;

    Page<User> page = Mockito.mock(Page.class);
    List<User> pageContent = List.of(mockUser01, mockUser02);

    Mockito
        .when(page.getNumberOfElements())
        .thenReturn(pageContent.size());
    Mockito
        .when(page.getTotalElements())
        .thenReturn(totalItems);
    Mockito
        .when(page.getTotalPages())
        .thenReturn(1);
    Mockito
        .when(page.getContent())
        .thenReturn(pageContent);

    Mockito
        .when(userService.findAllUsers(anyInt(), anyInt()))
        .thenReturn(page);

    String endpoint = baseUrl + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize;
    ResultActions httpResponse = mockMvc.perform(get(endpoint));

    httpResponse
        .andExpect(status().is(200))
        .andExpect(jsonPath("$.pageItems").value(pageContent.size()))
        .andExpect(jsonPath("$.totalItems").value(totalItems))
        .andExpect(jsonPath("$.pages").value(1))
        .andExpect(jsonPath("$.data", isA(List.class)))
        .andExpect(jsonPath("$.data.[0].id").value(mockUserId01.toString()))
        .andExpect(jsonPath("$.data.[0].name").value(mockUser01.getName()))
        .andExpect(jsonPath("$.data.[0].email").value(mockUser01.getEmail()))
        .andExpect(jsonPath("$.data.[0].cpf").value(mockUser01.getCpf()))
        .andExpect(jsonPath("$.data.[0].telephone").value(mockUser01.getTelephone()))
        .andExpect(jsonPath("$.data.[0].status").value(mockUser01.getStatus().toString()))
        .andExpect(jsonPath("$.data.[1].id").value(mockUserId02.toString()))
        .andExpect(jsonPath("$.data.[1].name").value(mockUser02.getName()))
        .andExpect(jsonPath("$.data.[1].email").value(mockUser02.getEmail()))
        .andExpect(jsonPath("$.data.[1].cpf").value(mockUser02.getCpf()))
        .andExpect(jsonPath("$.data.[1].telephone").value(mockUser02.getTelephone()))
        .andExpect(jsonPath("$.data.[1].status").value(mockUser02.getStatus().toString()));

    ArgumentCaptor<Integer> pageNumberCaptor = ArgumentCaptor.forClass(Integer.class);
    ArgumentCaptor<Integer> pageSizeCaptor = ArgumentCaptor.forClass(Integer.class);
    Mockito
        .verify(userService, Mockito.times(1))
        .findAllUsers(pageNumberCaptor.capture(), pageSizeCaptor.capture());

    assertEquals(pageNumber, pageNumberCaptor.getValue());
    assertEquals(pageSize, pageSizeCaptor.getValue());
  }

  @Test
  @DisplayName("Verifica se é retornado uma entidade User pelo seu id")
  public void findUserByIdTest() throws Exception {
    Mockito
        .when(userService.findUserById(mockUserId01))
        .thenReturn(mockUser01);

    String endpoint = baseUrl + "/" + mockUserId01.toString();
    ResultActions httpResponse = mockMvc.perform(get(endpoint));

    httpResponse
        .andExpect(status().is(200))
        .andExpect(jsonPath("$.id").value(mockUserId01.toString()))
        .andExpect(jsonPath("$.name").value(mockUser01.getName()))
        .andExpect(jsonPath("$.email").value(mockUser01.getEmail()))
        .andExpect(jsonPath("$.cpf").value(mockUser01.getCpf()))
        .andExpect(jsonPath("$.telephone").value(mockUser01.getTelephone()))
        .andExpect(jsonPath("$.status").value(mockUser01.getStatus().toString()));

    Mockito
        .verify(userService, Mockito.times(1))
        .findUserById(any(UUID.class));
  }

  @Test
  @DisplayName("Verifica se é disparado uma exceção quanto não se encontra uma entidade User pelo seu id")
  public void findSubjectByIdTestNotFoundError() throws Exception {
    Mockito
        .when(userService.findUserById(mockUserId01))
        .thenThrow(new NotFoundException("Usuário não encontrado"));

    String endpoint = baseUrl + "/" + mockUserId01.toString();
    ResultActions httpResponse = mockMvc.perform(get(endpoint));

    httpResponse
        .andExpect(status().is(404))
        .andExpect(jsonPath("$").value("Usuário não encontrado"));

    Mockito
        .verify(userService, Mockito.times(1))
        .findUserById(any(UUID.class));
  }

  @Test
  @DisplayName("Verifica se é criado uma entidade User")
  public void createUserTest() throws Exception {
    Mockito
        .when(userService.createUser(any(User.class)))
        .thenReturn(mockUser01);

    UserInputDto userInputDto = new UserInputDto(
        "Cainã Jucá",
        "caina.juca@gmail.com",
        "26252833756",
        "27997777008",
        "ATIVO"
    );

    ResultActions httpResponse = mockMvc
        .perform(post(baseUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(userInputDto)));

    httpResponse
        .andExpect(status().is(201))
        .andExpect(jsonPath("$.id").value(mockUserId01.toString()))
        .andExpect(jsonPath("$.name").value(mockUser01.getName()))
        .andExpect(jsonPath("$.email").value(mockUser01.getEmail()))
        .andExpect(jsonPath("$.cpf").value(mockUser01.getCpf()))
        .andExpect(jsonPath("$.telephone").value(mockUser01.getTelephone()))
        .andExpect(jsonPath("$.status").value(mockUser01.getStatus().toString()));

    Mockito
        .verify(userService, Mockito.times(1))
        .createUser(any(User.class));
  }

  @Test
  @DisplayName("Verifica se é disparado uma exceção quando se tenta cadastrar uma entidade User já existente")
  public void createUserTestAlreadyExistsError() throws Exception {
    Mockito
        .when(userService.createUser(any(User.class)))
        .thenThrow(new AlreadyExistsException("Usuário já cadastrado!"));

    UserInputDto userInputDto = new UserInputDto(
        "Cainã Jucá",
        "caina.juca@gmail.com",
        "26252833756",
        "27997777008",
        "ATIVO"
    );

    ResultActions httpResponse = mockMvc
        .perform(post(baseUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(userInputDto)));

    httpResponse
        .andExpect(status().is(400))
        .andExpect(jsonPath("$").value("Usuário já cadastrado!"));

    Mockito
        .verify(userService, Mockito.times(1))
        .createUser(any(User.class));
  }

  @Test
  @DisplayName("Verifica se uma entidade User é atualizada")
  public void updateUserByIdTest() throws Exception {
    Mockito
        .when(userService.updateUser(any(UUID.class), any(User.class)))
        .thenReturn(mockUser01);

    UserInputDto userInputDto = new UserInputDto(
        "William Barbosa",
        "will.barbosa@gmail.com",
        "13152742647",
        "27982820082",
        "AGUARDANDO_ATIVACAO"
    );

    String endpoint = baseUrl + "/" + mockUserId01.toString();
    ResultActions httpResponse = mockMvc
        .perform(put(endpoint)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(userInputDto)));

    httpResponse
        .andExpect(status().is(200))
        .andExpect(jsonPath("$.id").value(mockUserId01.toString()))
        .andExpect(jsonPath("$.name").value(mockUser01.getName()))
        .andExpect(jsonPath("$.email").value(mockUser01.getEmail()))
        .andExpect(jsonPath("$.cpf").value(mockUser01.getCpf()))
        .andExpect(jsonPath("$.telephone").value(mockUser01.getTelephone()))
        .andExpect(jsonPath("$.status").value(mockUser01.getStatus().toString()));

    Mockito
        .verify(userService, Mockito.times(1))
        .updateUser(any(UUID.class), any(User.class));
  }

  @Test
  @DisplayName("Verifica se é disparado uma exceção quanto não se encontra uma entidade User pelo seu id")
  public void updateSubjectByIdTestNotFoundTest() throws Exception {
    Mockito
        .when(userService.updateUser(any(UUID.class), any(User.class)))
        .thenThrow(new NotFoundException("Usuário não encontrado!"));

    UserInputDto userInputDto = new UserInputDto(
        "William Barbosa",
        "will.barbosa@gmail.com",
        "13152742647",
        "27982820082",
        "AGUARDANDO_ATIVACAO"
    );

    String endpoint = baseUrl + "/" + mockUserId01.toString();
    ResultActions httpResponse = mockMvc
        .perform(put(endpoint)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(userInputDto)));

    httpResponse
        .andExpect(status().is(404))
        .andExpect(jsonPath("$").value("Usuário não encontrado!"));

    Mockito
        .verify(userService, Mockito.times(1))
        .updateUser(any(UUID.class), any(User.class));
  }

  @Test
  @DisplayName("Verifica se uma entidade User é deletada")
  public void deleteUserTest() throws Exception {
    Mockito
        .doNothing().when(userService).deleteUser(mockUserId01);

    String endpoint = baseUrl + "/" + mockUserId01.toString();
    ResultActions httpResponse = mockMvc.perform(delete(endpoint));

    httpResponse
        .andExpect(status().is(204));

    Mockito
        .verify(userService, Mockito.times(1))
        .deleteUser(any(UUID.class));
  }

  @Test
  @DisplayName("Verifica se na deleção é disparado uma exceção quanto não se encontra uma entidade User pelo seu id")
  public void deleteUserTestNotFoundError() throws Exception {
    Mockito
        .doThrow(new NotFoundException("Usuário não encontrado"))
        .when(userService).deleteUser(mockUserId01);


    String endpoint = baseUrl + "/" + mockUserId01.toString();
    ResultActions httpResponse = mockMvc.perform(delete(endpoint));

    httpResponse
        .andExpect(status().is(404))
        .andExpect(jsonPath("$").value("Usuário não encontrado"));

    Mockito
        .verify(userService, Mockito.times(1))
        .deleteUser(any(UUID.class));
  }
}
