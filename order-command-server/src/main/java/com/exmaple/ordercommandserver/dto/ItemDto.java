package com.exmaple.ordercommandserver.dto;

import lombok.Data;

@Data
public class ItemDto {
    private Long productId;
    private int quantity;
    private int price;

}
