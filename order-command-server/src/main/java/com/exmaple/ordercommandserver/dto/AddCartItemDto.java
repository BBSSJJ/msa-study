package com.exmaple.ordercommandserver.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddCartItemDto {
    private Long productId;
    private int quantity;
}
