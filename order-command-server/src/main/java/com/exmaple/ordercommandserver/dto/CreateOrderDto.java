package com.exmaple.ordercommandserver.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderDto {
    private Long userId;
    private List<ItemDto> items;
}
