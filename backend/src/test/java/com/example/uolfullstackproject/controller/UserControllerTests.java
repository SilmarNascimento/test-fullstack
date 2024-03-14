package com.example.uolfullstackproject.controller;

import com.example.uolfullstackproject.service.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class UserControllerTests {
  @Autowired
  MockMvc mockMvc;

  @MockBean
  private UserServiceInterface userService;

}
