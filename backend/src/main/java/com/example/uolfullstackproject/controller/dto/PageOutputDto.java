package com.example.uolfullstackproject.controller.dto;


import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public record PageOutputDto<Type>(
    int pageItems,
    long totalItems,
    int pages,
    List<Type> data
) {
  public static <Type, Dto> PageOutputDto<Dto> parseDto(Page<Type> page, Function<Type, Dto> dtoConverter) {
    return new PageOutputDto<>(
        page.getNumberOfElements(),
        page.getTotalElements(),
        page.getTotalPages(),
        page.getContent().stream()
            .map(dtoConverter)
            .collect(Collectors.toList())
    );
  }
}

