package com.example.uolfullstackproject.controller.advice;

import com.example.uolfullstackproject.exception.AlreadyExistsException;
import com.example.uolfullstackproject.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<String> handleNotFoundException(NotFoundException exception) {
    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(exception.getMessage());
  }

  @ExceptionHandler(AlreadyExistsException.class)
  public ResponseEntity<String> handleAlreadyExistsException(AlreadyExistsException exception) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(exception.getMessage());
  }
}
