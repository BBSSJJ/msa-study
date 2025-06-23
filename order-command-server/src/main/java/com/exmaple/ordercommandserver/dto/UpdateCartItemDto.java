package com.exmaple.ordercommandserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdateCartItemDto {
    int quantity;
}
